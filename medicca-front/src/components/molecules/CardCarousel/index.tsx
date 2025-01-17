import { Box, Typography } from '@mui/material';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Appointment } from '../../../utils/types';
import AppointmentCard from '../../atoms/AppointmentCard';
import './style.scss';

interface CardCarouselProps {
  appointments: Appointment[];
  userType: 'doctor' | 'patient';
}

function CardCarousel({ appointments, userType }: CardCarouselProps) {
  return appointments.length > 0 ? (
    <Box className="card-carousel-container">
      <SwiperReact
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView="auto"
        pagination={{ clickable: true }}
      >
        {appointments.map((appointment, index) => (
          <SwiperSlide
            key={index}
            style={{ maxWidth: '350px', maxHeight: '100px' }}
          >
            <AppointmentCard appointment={appointment} userType={userType} />
          </SwiperSlide>
        ))}
      </SwiperReact>
    </Box>
  ) : (
    <Typography>Não há consultas anteriores registradas.</Typography>
  );
}

export default CardCarousel;
