import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>>;
    findAll(includeInactive?: boolean): Promise<Omit<User, 'password'>[]>;
    findOne(id: string): Promise<Omit<User, 'password'> | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>>;
    remove(id: string): Promise<Omit<User, 'password'>>;
    findById(id: string): Promise<User | null>;
}
