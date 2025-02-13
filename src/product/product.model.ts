import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
	@prop()
	_id: string;
	@prop()
	image: string;
	@prop()
	title: string;
	@prop()
	price: number;
	@prop()
	oldPrice: number;
	@prop()
	credit: number;
	@prop()
	calculatedRating: number;
	@prop()
	description: string;
	@prop()
	advantages: string;
	@prop()
	disAdvantages: string;
	@prop()
	categories: string[];
	@prop()
	tags: string;
	@prop()
	characteristics: {
		[ket: string]: string;
	};
}
