// export const calculatePayableAmount = (
//   startTime: string,
//   endTime: string,
//   pricePerHour: number,
// ): number => {
//   const start = new Date(startTime);
//   const end = new Date(endTime);


//   const durationInMilliseconds = end.getTime() - start.getTime();
//   const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
//   const payableAmount = durationInHours * pricePerHour;

//   return payableAmount;
// };

export const combineDateAndTime = (date: string, time: string): Date => {
  return new Date(`${date}T${time}:00`);
};

export const calculatePayableAmount = (startTime: Date, endTime: Date, pricePerHour: number): number => {
  const durationInMilliseconds = endTime.getTime() - startTime.getTime();
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
  return durationInHours * pricePerHour;
};