import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  styled,
} from '@mui/material';
import wash from '../../images/wash.png';
import dryWash from '../../images/dry-wash.png';
import tint from '../../images/tint.png';
import polish from '../../images/polish.png';
import wrap from '../../images/wrap.png';
import ambient from '../../images/wrap.png';
import sound from '../../images/sound.png';
import scratch from '../../images/scratch.png';
import rims from '../../images/rims.png';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Styled components
const SlideIndicator = styled(Box)(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active
    ? theme.palette.common.white
    : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
}));

const slides = [
  {
    image: wash,
    title: 'Делікатна мийка',
    description:
      'Ніжне та ефективне очищення вашого автомобіля без пошкоджень поверхні.',
  },
  {
    image: dryWash,
    title: 'Хімчистка',
    description:
      'Глибока чистка салону вашого авто для відновлення свіжості та приємного аромату.',
  },
  {
    image: tint,
    title: 'Тонування',
    description:
      'Захистіть своє авто від сонця та забезпечте комфорт завдяки професійному тонуванню.',
  },
  {
    image: polish,
    title: 'Полірування авто',
    description:
      'Поверніть блиск і ідеальний вигляд вашому автомобілю за допомогою полірування.',
  },
  {
    image: wrap,
    title: 'Антигравійні/Кольорові плівки',
    description:
      'Захистіть кузов від дрібних пошкоджень і додайте стилю за допомогою кольорових плівок.',
  },
  {
    image: ambient,
    title: 'Ambient підсвітка салону',
    description:
      'Створіть неповторну атмосферу в салоні вашого авто за допомогою сучасної підсвітки.',
  },
  {
    image: sound,
    title: 'Шумоізоляція авто',
    description:
      'Забезпечте спокійну поїздку без зайвого шуму за допомогою шумоізоляції.',
  },
  {
    image: scratch,
    title: 'Видалення сколів та подряпин',
    description:
      'Позбавтеся від сколів і подряпин на кузові, відновлюючи його первісний вигляд.',
  },
  {
    image: rims,
    title: 'Відновлення та фарбування дисків',
    description:
      'Поверніть естетичний вигляд ваших дисків і надайте їм нового блиску.',
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: 'grey.100',
      }}
    >
      <Box sx={{ position: 'relative', height: '100vh' }}>
        {/* Hero Section with Slider */}
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                inset: 0,
                transition: 'opacity 1s ease-in-out',
                opacity: currentSlide === index ? 1 : 0,
              }}
            >
              <Box
                component="img"
                src={slide.image}
                alt={slide.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                }}
              />
              <Container
                maxWidth="md"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'common.white',
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    mb: 3,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    textAlign: 'center',
                  }}
                >
                  {slide.description}
                </Typography>
              </Container>
            </Box>
          ))}
        </Box>

        {/* Navigation Buttons */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.75)',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.75)',
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Slide Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {slides.map((_, index) => (
            <SlideIndicator
              key={index}
              active={currentSlide === index}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Box>

        {/* CTA Button */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 64,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/registration"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.25rem',
            }}
          >
            Детальніше
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
