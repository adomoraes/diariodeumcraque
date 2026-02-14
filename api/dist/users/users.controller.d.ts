import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<Omit<{
        email: string;
        name: string;
        password: string;
        birthDate: Date | null;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, "password"> | null>;
    create(createUserDto: CreateUserDto): Promise<Omit<{
        email: string;
        name: string;
        password: string;
        birthDate: Date | null;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    findAll(): Promise<Omit<{
        email: string;
        name: string;
        password: string;
        birthDate: Date | null;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, "password">[]>;
    findOne(id: string): Promise<Omit<{
        email: string;
        name: string;
        password: string;
        birthDate: Date | null;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, "password"> | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<{
        email: string;
        name: string;
        password: string;
        birthDate: Date | null;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    remove(id: string): Promise<Omit<{
        email: string;
        name: string;
        password: string;
        birthDate: Date | null;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
}
