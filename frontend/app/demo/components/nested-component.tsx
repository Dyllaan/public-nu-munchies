interface Props {
  name: string;
}
// declaring component with props and typescript
export const NestedComponent: React.FC<Props> = ({ name }) => {
  return (
    <>
      <h1 className="text-2xl">Welcome to Nested Component {name}</h1>
      <p className="text-lg mt-2">
        This component is only available for Demo subsystem, therefore you can
        find it under the appropriate folder in the app/demo/components folder.
      </p>
    </>
  );
};
