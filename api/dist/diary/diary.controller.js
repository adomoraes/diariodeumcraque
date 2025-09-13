"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryController = void 0;
const common_1 = require("@nestjs/common");
const diary_service_1 = require("./diary.service");
const create_diary_entry_dto_1 = require("./dto/create-diary-entry.dto");
const update_diary_entry_dto_1 = require("./dto/update-diary-entry.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DiaryController = class DiaryController {
    diaryService;
    constructor(diaryService) {
        this.diaryService = diaryService;
    }
    getWeeklySummary(req) {
        return this.diaryService.getWeeklySummary(req.user.userId);
    }
    create(req, createDiaryEntryDto) {
        return this.diaryService.create(createDiaryEntryDto, req.user.userId);
    }
    findAll(req) {
        return this.diaryService.findAll(req.user.userId);
    }
    findOne(req, id) {
        return this.diaryService.findOne(id, req.user.userId);
    }
    update(req, id, updateDiaryEntryDto) {
        return this.diaryService.update(id, updateDiaryEntryDto, req.user.userId);
    }
    remove(req, id) {
        return this.diaryService.remove(id, req.user.userId);
    }
};
exports.DiaryController = DiaryController;
__decorate([
    (0, common_1.Get)('summary/weekly'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "getWeeklySummary", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_diary_entry_dto_1.CreateDiaryEntryDto]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_diary_entry_dto_1.UpdateDiaryEntryDto]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "remove", null);
exports.DiaryController = DiaryController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('diary'),
    __metadata("design:paramtypes", [diary_service_1.DiaryService])
], DiaryController);
//# sourceMappingURL=diary.controller.js.map