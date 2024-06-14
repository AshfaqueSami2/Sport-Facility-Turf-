import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/User/user.router';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import globalErrorHandler from './middlewares/globalErrorhandler';
import { FacilityRoutes } from './app/modules/Facility/facility.route';
import { BookingsRoutes } from './app/modules/Booking/booking.route';
import notFound from './middlewares/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/', UserRoutes);
app.use('/', AuthRoutes);
app.use('/', FacilityRoutes);
app.use('/',BookingsRoutes);


//not found
app.use(notFound);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.use(globalErrorHandler);

app.get('/', getAController);

export default app;
