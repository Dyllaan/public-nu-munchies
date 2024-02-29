export const useDemoSubsystem = () => {
  const callSomeApi = () => {
    console.log("Calling some api");
  };
  return {
    callSomeApi,
  };
};
