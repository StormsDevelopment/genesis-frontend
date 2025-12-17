import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "pmo" | "coordinator" | "collaborator";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  userSector: string;
  rolePermissions: {
    canValidateChecklists: boolean;
    canJudgeDisputes: boolean;
    canManageUsers: boolean;
    canManageSectors: boolean;
    canReportErrors: boolean;
    canAssignTasks: boolean;
    canViewAllSectors: boolean;
    canExportReports: boolean;
    canImportChecklists: boolean;
  };
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const getRolePermissions = (role: UserRole) => {
  switch (role) {
    case "pmo":
      return {
        canValidateChecklists: true,
        canJudgeDisputes: true,
        canManageUsers: true,
        canManageSectors: true,
        canReportErrors: true,
        canAssignTasks: true,
        canViewAllSectors: true,
        canExportReports: true,
        canImportChecklists: true,
      };
    case "coordinator":
      return {
        canValidateChecklists: true,
        canJudgeDisputes: false,
        canManageUsers: false,
        canManageSectors: false,
        canReportErrors: true,
        canAssignTasks: true,
        canViewAllSectors: false,
        canExportReports: true,
        canImportChecklists: true,
      };
    case "collaborator":
      return {
        canValidateChecklists: false,
        canJudgeDisputes: false,
        canManageUsers: false,
        canManageSectors: false,
        canReportErrors: true,
        canAssignTasks: false,
        canViewAllSectors: false,
        canExportReports: false,
        canImportChecklists: false,
      };
  }
};

const getRoleInfo = (role: UserRole) => {
  switch (role) {
    case "pmo":
      return { userName: "Dr. Carlos Mendes", userSector: "Administração Central" };
    case "coordinator":
      return { userName: "Dra. Maria Santos", userSector: "Cardiologia" };
    case "collaborator":
      return { userName: "João Silva", userSector: "UTI" };
  }
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("pmo");

  const { userName, userSector } = getRoleInfo(role);
  const rolePermissions = getRolePermissions(role);

  return (
    <RoleContext.Provider value={{ role, setRole, userName, userSector, rolePermissions }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
