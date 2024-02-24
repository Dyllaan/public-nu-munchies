interface Props {
  name: string;
}
// declaring component with props and typescript
export const SharedComponent: React.FC<Props> = ({ name }) => {
  return (
    <>
      <h1 className="text-2xl mt-4">Welcome to Shared Component {name}</h1>
      <p className="text-lg mt-2">
        This component is available across all subsystems, therefore you can
        find it in the app/components folder.
      </p>
    </>
  );
};
