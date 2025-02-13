import { Module } from "@nestjs/common";
import { FilesController } from "./controller";
import { FileService } from "./service";
import { JwtStrategy } from "src/services/jwt.service";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/repository/user.repository";
import { FileRepository } from "src/repository/file.repository";

@Module({
    controllers: [FilesController],
    providers: [FileService, JwtStrategy, JwtService, UserRepository, FileRepository]
})
export class FilesModule {}