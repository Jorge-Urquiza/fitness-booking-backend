import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { BookingResponseDto } from './dto/booking-response.dto';
import { BookingsService } from './bookings.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('classes/:classId/book')
  bookClass(
    @Param('classId', ParseIntPipe) classId: number,
    @CurrentUser() user: User,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.bookClass(classId, user);
  }

  @Post('bookings/:id/cancel')
  cancelBooking(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.cancelBooking(id, user);
  }

  @Get('bookings/me')
  findMyBookings(@CurrentUser() user: User): Promise<BookingResponseDto[]> {
    return this.bookingsService.findMyBookings(user);
  }
}
