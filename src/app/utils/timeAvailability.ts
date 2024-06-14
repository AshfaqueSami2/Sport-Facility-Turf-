export const generateAvailableTimeSlots = (start: string, end: string, interval: number) => {
    const slots = [];
    const startHour = parseInt(start.split(':')[0], 10);
    const endHour = parseInt(end.split(':')[0], 8);
  
    for (let i = startHour; i < endHour; i += interval) {
      slots.push({
        startTime: `${String(i).padStart(2, '0')}:00`,
        endTime: `${String(i + interval).padStart(2, '0')}:00`,
      });
    }
  
    return slots;
  };