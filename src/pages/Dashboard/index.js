import React, { useEffect, useState, useMemo } from 'react';
import {
  format,
  isThisYear,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';

import { Container, Time } from './styles';

// Melhorias realizar a busca do range de horarios vinda do back end
// deixando o provedor configurar
const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  const dateFormatted = useMemo(() => {
    const formatPattern = isThisYear(date)
      ? "d 'de' MMMM"
      : "d 'de' MMMM'/'yyyy";
    return format(date, formatPattern, { locale: pt });
  }, [date]);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('/schedule', {
        params: {
          date,
        },
      });

      const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

      const data = range.map(hour => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timeZone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a => {
            return isEqual(parseISO(a.date), compareDate);
          }),
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDays() {
    setDate(subDays(date, 1));
  }

  function handleNextDays() {
    setDate(addDays(date, 1));
  }
  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDays}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDays}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>
      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <div>
              {time.appointment && (
                <img
                  src={
                    time.appointment.user.avatar
                      ? time.appointment.user.avatar.url
                      : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                  }
                  alt={time.appointment.user.name}
                />
              )}

              <span>
                {time.appointment ? time.appointment.user.name : 'Em aberto'}
              </span>
            </div>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
