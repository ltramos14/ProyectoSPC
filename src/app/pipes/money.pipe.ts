import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "money",
})
export class MoneyPipe implements PipeTransform {
  transform(value?: string, args?: any[]): string {
    if (value) {
      return value.replace(",", ".");
    }
    return "";
  }
}
