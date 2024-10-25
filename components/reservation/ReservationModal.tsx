'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CustomDatePicker from '../shared/CustomDatePicker';
import {
  sendSaveReservation,
  getLatestCheckInOutDates,
} from '@/server/actions/reservationActions';
import { formatDate } from '@/lib/utils/dayjs';
import {
  generateExcludedDates,
  checkIsRoomAvailable,
  calculateStayDuration,
} from '@/lib/utils/clientHelperFunction';

type ReservationModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  roomId: string;
  roomPrice?: number;
};

const ReservationModal = ({
  isOpen,
  onOpenChange,
  roomId,
  roomPrice,
}: ReservationModalProps) => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [excludedDates, setExcludedDates] = useState<
    { start: Date; end: Date }[]
  >([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchLatestCheckInOutDates = async () => {
      const dates = await getLatestCheckInOutDates(roomId);
      const generatedDates = generateExcludedDates(dates);
      setDateRange(dates);
      setExcludedDates(generatedDates);
    };
    if (roomId) {
      fetchLatestCheckInOutDates();
    }
  }, [roomId, isOpen]);

  const handleDateRangeChange = useCallback((start: Date, end: Date) => {
    setDateRange([start, end]);
  }, []);

  const onCreateReservation = () => {
    const [checkIn, checkOut] = dateRange;

    if (!checkIn || !checkOut) {
      toast.warning('Please select date range for this reservation.');
      return;
    }

    const stayDuration = calculateStayDuration(checkIn, checkOut);
    const isRoomAvailable = checkIsRoomAvailable(
      excludedDates,
      checkIn,
      checkOut
    );
    const body = {
      room: roomId,
      checkIn: formatDate(checkIn),
      checkOut: formatDate(checkOut),
      stayDuration,
      bill: roomPrice,
      isBillPaid: false,
      billPaidAt: '',
    };

    setDateRange([]);
    setExcludedDates([]);

    if (isRoomAvailable) {
      toast.success('Reservation successfully saved.');
      return body;
    } else {
      toast.warning(
        `Room for this date range is already reserved!
           Please select available dates.`
      );
    }
  };

  const onCancelReservation = () => {
    setDateRange([]);
    setExcludedDates([]);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col items-center gap-1'>
                Create Reservation
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col mb-2'>
                  <span>Reservation Date Range</span>
                  <span className='text-warning-600 mb-1'>{` (Already reserved dates are disabled)`}</span>
                  <CustomDatePicker
                    dateFormat='DD-MM-YYYY hh:mm:ss'
                    excludedDates={excludedDates}
                    startDefault={dateRange[0]}
                    endDefault={dateRange[1]}
                    onChangeHandler={handleDateRangeChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onClick={onCancelReservation}
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    const body = onCreateReservation();
                    await sendSaveReservation(body);
                    router.push('/reservations');
                    router.refresh();
                  }}
                  color='primary'
                  onPress={onClose}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReservationModal;
