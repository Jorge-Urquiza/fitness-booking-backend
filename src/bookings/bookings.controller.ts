import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { BookingResponseDto } from './dto/booking-response.dto';
import { BookingsService } from './bookings.service';

@Controller()
@UseGuards(JwtAuthGuard)
@ApiTags('Bookings')
@ApiBearerAuth('bearer')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('classes/:classId/book')
  @ApiOperation({ summary: 'Book a class for current user' })
  @ApiParam({ name: 'classId', type: Number, example: 1 })
  @ApiOkResponse({ type: BookingResponseDto })
  bookClass(
    @Param('classId', ParseIntPipe) classId: number,
    @CurrentUser() user: User,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.bookClass(classId, user);
  }

  @Post('bookings/:id/cancel')
  @ApiOperation({ summary: 'Cancel a booking owned by current user' })
  @ApiParam({ name: 'id', type: Number, example: 10 })
  @ApiOkResponse({ type: BookingResponseDto })
  cancelBooking(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.cancelBooking(id, user);
  }

  @Get('bookings/me')
  @ApiOperation({ summary: 'List current user bookings' })
  @ApiOkResponse({ type: BookingResponseDto, isArray: true })
  findMyBookings(@CurrentUser() user: User): Promise<BookingResponseDto[]> {
    return this.bookingsService.findMyBookings(user);
  }
}
