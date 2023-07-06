import {Streamlit} from "streamlit-component-lib"
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import React, { useState, useEffect, useRef, MouseEvent  } from 'react';

const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const App: React.FC = () => {
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const ant_picker = document.querySelector('.ant-picker-panels') as HTMLElement;
  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  useEffect(() => {
    console.log(isOpen, ref.current)
    if(window.innerWidth < 480 && isOpen && ref.current) {
      console.log("vô tới đây rồi nè")
      ant_picker.style["flex-direction" as any] = 'column'
      ant_picker.style.overflow = 'auto'
      ant_picker.style.height = (ref.current.offsetWidth) + 'px'
    }
    if (isOpen) {
      Streamlit.setFrameHeight(350)
    }
    else {
      Streamlit.setFrameHeight()
    }
    console.log('------------------------')
  })

  return (
    <div ref={ref}>
      <RangePicker
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => {
        setDates(val);
      }}
      onChange={(val) => {
        console.log('Vy ne')
        setValue(val);
        Streamlit.setComponentValue(val)
      }}
      onOpenChange={onOpenChange}
      changeOnBlur
    />
    </div>
  );
};

export default App;