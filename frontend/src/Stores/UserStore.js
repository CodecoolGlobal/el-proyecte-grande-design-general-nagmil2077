import create from 'zustand';

const useAvailableUsersStore = create(set => ({
    availableUsers: new Map(),
    selectedUsers: new Map(),
    fetchAvailableUsers: async (machineId, hour) => {
        const response = await fetch(`/api/available-users?machineId=${machineId}&hour=${hour}`);
        const users = await response.json();
        set(state => ({ availableUsers: state.availableUsers.set(`${machineId}-${hour}`, users) }));
    },
    removeUserFromDropdowns: (userId, hour) => {
        set(state => {
            const updatedAvailableUsers = new Map(state.availableUsers);
            updatedAvailableUsers.forEach((users, key) => {
                if (key.endsWith(`-${hour}`)) {
                    const filteredUsers = users.filter(user => user.id !== userId);
                    updatedAvailableUsers.set(key, filteredUsers);
                }
            });
            return { availableUsers: updatedAvailableUsers };
        });
    },
    setSelectedUser: (machineId, hour, userId) => set(state => {
        const key = `${machineId}-${hour}`;
        const updatedSelectedUsers = new Map(state.selectedUsers).set(key, userId);
        return { selectedUsers: updatedSelectedUsers };
    }),

}));
export default useAvailableUsersStore;
