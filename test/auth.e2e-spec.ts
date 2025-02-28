import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { disconnect } from 'mongoose';

const loginDto_success: AuthDto = {
	login: 'a@a.ru',
	password: '1'
}
const loginDto_failed_password: AuthDto = {
	login: 'a@a.ru',
	password: '2'
}
const loginDto_failed_login: AuthDto = {
	login: 'a@aaaa.ru',
	password: '1'
}

describe('AuthContorller (e2e)', ()=>{
	let app: INestApplication;
	
	beforeEach(async ()=>{
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication();
		await app.init();
	})

	it('/auth/login (POST) - success', async(done)=>{
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto_success)
			.expect(200)
			.then(({body}: request.Response)=>{
				expect(body.access_token).toBeDefined();
				done();
			});
	});

	it('/auth/login (POST) - fail', async()=>{
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto_failed_password)
			.expect(401, {
				statusCode: 401,
				message: "Неверный пароль",
				error: "Unauthorized"
			});

	});

	it('/auth/login (POST) - fail', async()=>{
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto_failed_login)
			.expect(401, {
				statusCode: 401,
				message: "Пользователь с таким email не найден",
				error: "Unauthorized"
			});
	});
	afterAll(() => {
		disconnect();
	});

})