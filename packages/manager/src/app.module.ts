import { ManagerModule } from "@app/application/manager/manager.module";
import { MongooseModule } from "@app/infra/persistence/mongoose/mongoose.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [MongooseModule, ManagerModule],
})
export class AppModule {}
