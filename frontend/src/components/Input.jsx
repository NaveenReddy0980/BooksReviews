export default function Input({
  type = 'text',
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  icon,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-gray-500">
            {icon}
          </span>
        )}
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
