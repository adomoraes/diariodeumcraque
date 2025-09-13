import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(createUserDto: CreateUserDto): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
