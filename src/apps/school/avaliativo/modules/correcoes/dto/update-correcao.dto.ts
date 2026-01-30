import { PartialType } from "@nestjs/mapped-types";
import { CreateCorrecaoDto } from "./create-correcao.dto";

export class UpdateCorrecaoDto extends PartialType(CreateCorrecaoDto) {}