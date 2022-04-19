export const Label = ({ children, ...props }) => (
  <label className="block mb-2 opacity-50" {...props}>
    {children}
  </label>
);

export const Input = (props) => (
  <input className="bg-slate-600 rounded-md w-full border-0" {...props} />
);
