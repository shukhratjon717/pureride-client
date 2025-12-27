import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Box, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'scale(1.05)',
  },
  
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

const IconWrapper = styled('div')<{ isActive: boolean }>(({ isActive }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0}) rotate(${isActive ? 0 : 180}deg)`,
  opacity: isActive ? 1 : 0,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme, colors } = useTheme();

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} arrow>
      <ToggleButton
        onClick={toggleTheme}
        sx={{
          background: mode === 'light' 
            ? `linear-gradient(135deg, ${colors.accentPrimary}15, ${colors.accentSecondary}15)`
            : `linear-gradient(135deg, ${colors.accentPrimary}25, ${colors.accentSecondary}25)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.borderGlass}`,
          boxShadow: colors.shadowGlass,
          
          '&:hover': {
            background: mode === 'light'
              ? `linear-gradient(135deg, ${colors.accentPrimary}25, ${colors.accentSecondary}25)`
              : `linear-gradient(135deg, ${colors.accentPrimary}35, ${colors.accentSecondary}35)`,
            boxShadow: `0 12px 40px 0 ${colors.accentGlow}`,
          },
        }}
      >
        {/* Sun Icon */}
        <IconWrapper isActive={mode === 'light'}>
          <span style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' }}>☀️</span>
        </IconWrapper>
        
        {/* Moon Icon */}
        <IconWrapper isActive={mode === 'dark'}>
          <span style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))' }}>🌙</span>
        </IconWrapper>
      </ToggleButton>
    </Tooltip>
  );
};
