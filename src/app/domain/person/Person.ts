import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { IPerson } from "./Person.types";
import { ApiResponse } from "helpers/ApiResponse";
import { ApiError } from "helpers/ApiError";

const storeData: IPerson[] = [];

@JsonController("/person")
export default class Person {
  @Get()
  async getAll() {
    return new ApiResponse(true, storeData);
  }

  @Get("/:id")
  async getById(@Param("id") id: number): Promise<IPerson | {}> {
    const person = storeData.find((item) => item.id === id);

    if (!person) {
      throw new ApiError(404, {
        code: "PERSON_NOT_FOUND",
        message: `Person with id ${id} not found`
      });
    }

    return new ApiResponse(true, person);
  }

  @Post()
  async setPerson(@Body() body: IPerson) {
    storeData.push(body);

    return new ApiResponse(true, "Person successfully created");
  }
}
