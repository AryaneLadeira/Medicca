import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface DateRangeFilterProps {
  value: [Dayjs | null, Dayjs | null];
  onChange: (newValue: [Dayjs | null, Dayjs | null]) => void;
}

function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        localeText={{ start: 'Data inicial', end: 'Data final' }}
        value={value}
        onChange={onChange}
        sx={{ flex: 1, minWidth: '250px' }}
      />
    </LocalizationProvider>
  );
}

export default DateRangeFilter;
