import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface NoticeRegisterForm {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

export default function FormInput({
  name,
  label,
  type = 'text',
  validate,
  errors,
  register,
  placeholder,
  value,
  onInput,
}: {
  name: keyof NoticeRegisterForm;
  label: string;
  type?: 'text' | 'textarea' | 'date';
  validate?: Record<string, unknown>;
  errors: FieldErrors<NoticeRegisterForm>;
  register: UseFormRegister<NoticeRegisterForm>;
  placeholder?: string;
  value?: string;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  const types = {
    text: 'text',
    date: 'datetime-local',
  };

  const spanContent = {
    hourlyPay: '원',
    workhour: '시간',
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onInput) {
      onInput(e);
    } else return;
  };

  return (
    <>
      <div className="relative">
        <label htmlFor={name}>{label}</label>
        {type !== 'textarea' ? (
          <input
            className="input"
            value={value}
            onInput={handleInput}
            id={name}
            placeholder={placeholder}
            type={types[type]}
            {...register(name, validate ? { ...validate } : {})}
          />
        ) : (
          <textarea
            className="input textarea resize-none"
            value={value}
            id={name}
            placeholder={placeholder}
            {...register(name, validate ? { ...validate } : {})}
          />
        )}
        {name in spanContent && (
          <span className="absolute right-4 top-[3rem] text-black">
            {spanContent[name as keyof typeof spanContent]}
          </span>
        )}
        {errors[name] && <span className="errorMessage">{errors[name].message}</span>}
      </div>
    </>
  );
}
