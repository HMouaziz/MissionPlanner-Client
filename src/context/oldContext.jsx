
const fetchMissionByID = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:5050/api/missions/${queryKey[1]}`);
  return response.data.data;
};
const putMissionByID = async (missionData) => {
  const response = await axios.put(`http://localhost:5050/api/missions/${missionData.data.id}`, formatMissionData(missionData.data))
  return response.data
}

const formatMySQLDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

const formatMissionData = (missionData) => {
  return {
    id: missionData.id,
    name: missionData.name,
    description: missionData.description || null,
    budget: missionData.budget ? parseInt(missionData.budget, 10) : null,
    launch_date: missionData.launch_date ? formatMySQLDate(missionData.launch_date) : null,
    start_date: missionData.start_date ? formatMySQLDate(missionData.start_date) : null,
  };
};

export const MissionProvider = ({ children, missionId}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mission", missionId],
    queryFn: fetchMissionByID,
    enabled: !!missionId,
  });

  const {mutateAsync} = useMutation({
    mutationFn: putMissionByID,
    onSuccess: () => queryClient.invalidateQueries(["mission", missionId])
  });

  const value = {
    mission: {data, isLoading, isError, error},
    updateMission: mutateAsync,
  };

  return (
    <MissionContext.Provider value={value}>{children}</MissionContext.Provider>
  );
};