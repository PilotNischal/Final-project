import { useFilterConsumer } from '../Services/useFilter';

const RangeSilder = ({ min, max, step, changeHandler, value }) => {
  const filter = useFilterConsumer();
  return (
    <div className="relative w-full py-4">
      <div
        className={'absolute left-0 top-0 h-1 w-full  bg-primary bg-none'}
      ></div>
      <div
        className={`absolute   right-0 top-0  h-1 rounded-md bg-white`}
        style={{ width: `${(+max - +filter.range.max) / step}%` }}
      ></div>
      <div
        className={`z-1 absolute  left-0 top-0   h-1 rounded-md bg-white`}
        style={{ width: `${(filter.range.min - min) / step}%` }}
      ></div>
      <input
        type={'range'}
        className={`absolute left-0 -top-2  w-1/2`}
        defaultValue={min}
        min={+min}
        max={+max / 2}
        name="min"
        step={step}
        onChange={(e) => changeHandler({ min: e.target.value })}
      />
      <input
        type={'range'}
        name="max"
        className={`absolute right-0 -top-2  w-1/2 `}
        min={+max / 2}
        max={+max}
        defaultValue={+max}
        step={step}
        onChange={(e) => changeHandler({ max: e.target.value })}
      />

      <div className="flex justify-between p-2">
        <div>{filter.range.min}</div>
        <div>{filter.range.max}</div>
      </div>
    </div>
  );
};

export default RangeSilder;
