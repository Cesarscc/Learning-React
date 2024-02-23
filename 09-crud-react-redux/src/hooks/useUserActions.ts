import {
  User,
  UserId,
  addNewUser,
  deleteUserById,
  editUserById,
} from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }));
  };

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };

  const editUser = ({ name, email, github }: User, id: UserId) => {
    dispatch(editUserById({ name, email, github, id }));
  };

  return { addUser, removeUser, editUser };
};
