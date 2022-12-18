// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../Component/formatNumber';
// components
import GradeIcon from '@mui/icons-material/Grade';
import SportsEsportsIcon from '@mui/icons-material/SportsEsportsOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GppBadIcon from '@mui/icons-material/GppBad';
// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------



export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        {icon == 'GradeIcon' ? <GradeIcon /> : <></>}
        {icon == 'SportsEsportsIcon' ? <SportsEsportsIcon /> : <></>}
        {icon == 'GppBadIcon' ? <GppBadIcon /> : <></>}
        {icon == 'EmojiEventsIcon' ? <EmojiEventsIcon /> : <></>}

      </StyledIcon>

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
