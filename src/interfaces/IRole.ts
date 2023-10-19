import { eRole } from "../Entities/entities";
import Role from "../Models/Role";

interface IRole {
  create(role: eRole): Promise<Role>;
  update(id: Number, roleName: string): Promise<[affectedRows: number]>;
  delete(id: Number): Promise<boolean>;
  all(): Promise<Role[]>;
  findById(id: number): Promise<Role | null>;
  roleByGroup(): Promise<Role[]>;
  roleByUserId(userId: number): Promise<Role[]>;
  roleByGroupId(groupId: number): Promise<Role[]>;
  isRoleAssigned(roleId: number): Promise<boolean>;
}

export default IRole;
