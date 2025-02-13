import { BadRequestException } from "@nestjs/common";

export const validationExeptionFactory = (errorList: any[])=> {
    const messages = errorList.map(error =>
      //! ToDo sub + chil modles validation pipe
        `${error.property} has wrong value ${error.value}, ${error.constants ? Object.values(error.constraints).join(', ') : ''}`
      );
      return new BadRequestException(messages[0]);
}
