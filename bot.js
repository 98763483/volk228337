const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const str = new VK();
const fs = require("fs");
const admins = [0];
const vip = [0];
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const log = require("./base/log.json");
const frac = require("./base/frac.json");
const config = require("./setting/config.json");
const akk = require("./base/akk.json");

vk.setOptions({
    token: '79ae4eb74afd3338c4659ddca4ed6f50dab55aae636b5aff5ece2e41ee8ae1f5a8042b45c4541d9b3b003', 
    apiMode: 'parallel',
	pollingGroupId: 180164772
});
vk.updates.use(async (message, next) => {
if(message.is("message") && message.isOutbox)
return; 
    message.user = message.senderId;
    message.text = message.payload.text;  
    if (!message.text) return;
    if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
}
 		let id = user_id(message.user); 		 
		message.send(`🔔 @id${message.user}(Уважаемый пользователь), для того что-бы начать играть, вам непосредственно надо зарегистрироваться.\n Статус вашего аккаунта: "Не зарегистрирован"\n -- Для начала регистрации напишите -- "регистрация" и следуйте дальнейшим указаниям`)
		acc.users[numm] = {
			lock: true,
			restart: false,
			full: false,
			donate: 0,
			stat: false,
			act: false,
			unban: false,
			stick: false,
			invie: 0,
			invites: true,
			verify: false,
			balance: 15000,
			sphone: false,
			level: 0, 
			adm_time: 0,
			donate: 0,
			rub: 0,
			keys: 0,
			qiwi: false, 
			safe_status: false,
			safe_key: false, 
			bloks_cases: false,
		    bloks_giverub: false,
		    bloks_frac: false,
		    bloks_gun_case: false,
			bizs_one_stop: false,
		    bizs_two_stop: false,
		    block_game: true,
		    block_porn: true,
			exs: 0,
			exsup: 50,
			lvl: 0,
			foolder: 1,
			number: numm,
			id: message.user,
			nick: true,
			game: {
				binlose: 0,
				binwin: 0,
				binstop: false,
				kazlose: 0,
				kazwin: 0,
				rand_lose: 0,
				rand_win: 0,
				stavka_win: 0,
				stavka_lose: 0,
				win: 45,
			},
			msg: { 
				messages: 0, 
				last_msg: "" 
			},  
			bizs: {
				one_biz: false,
				one: {
					count: false,
					balance: 0,
					id: false,
					name: false,
					people: 0,
					uplvl: 0,
					zp: 0
					},
				two_biz: false,
				two: {
					count: false,
					balance: 0,
					id: false,
					name: false,
					people: 0,
					uplvl: 0,
					zp: 0
					}
			},
			cars: false,
			reys: false,
			aircraft: false,
			helicopter: false,
			house: false,
			housep: 0,
			pit: false,
			bank: 0,
			lodka: false,
			tag: "Игрок", 
			brak: false,
			ainfo: {
				all_ans: 0,
				ans: 0, 
				good_ans: 0,
				bad_ans: 0,
				vig: 0
			}, 
			admin: {
				block_pay: false,
				block_give: false,
				block_rep: false
			}, 
			rep: {
				status: false,
				id: false
			},
			ban: false, 
			mute: false,
			warn: 0,
			warn_p: [],
			credit: 0,
			procent: 0,
			job: { 
				name: false, 
				lvl: 0,  
				count: 0 
			}, 
			job_stop: false,
			global_exs: 0,
			frac_name: false,
			nachal: false,
			prefix: `Игрок №${numm}`,
			lvl_v: 1,
			zov: 0,
			rtime: `${time()} | ${data()}` 
			} 
			vk.api.call('users.get', {
				user_ids: message.user,
				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
			}).then(res => {
				let user = res[0]; 
				acc.users[user_id(message.user)].prefix = `${user.first_name} ${user.last_name}`;
			}).catch((error) => {console.log('err[prefix]'); }); 
	}
	let id = user_id(message.user);
	if(message.text){ 
		acc.msg += 1;
		if(!acc.users[user_id(message.user)]) return;
		acc.users[id].msg.messages += 1;
		acc.users[id].msg.last_msg = `${time()} | ${data()}`; 
		if(acc.users[id].mute == true) return message.send(`Ваш аккаунт временно заблокирован.\n -- Вы можете снять блокировку досрочно, oплатив 30₽\n Преобретать у @alexandvolk(Основателя)`);
	}
	if(acc.users[id].ban != false) return message.send(`Ваш аккаунт заблокирован навсегда.\n -- Вы можете снять блокировку, oплатив 100₽\n Преобретать у @alexandvolk (Основателя)`);
    try {
        await next();
    } catch (err) { console.error(err) }
});
    vk.updates.use(async (message, next) => {  
	if (message.is("message") && message.isOutbox) {return} 
	message.user = message.senderId; message.text = message.payload.text;  if (!message.text) return; 
	try { await next(); } catch (err) { console.error(err) }
});
// Передаем инфу о юзере в message, для удобства
	vk.updates.use(async (message, next) => {
	message.user = message.senderId; message.text = message.payload.text;  
	if (!message.text) return;
	new_akk(message.user);
	if(akk.users[message.user].bban == true) {return;}
	try { await next(); } catch (err) { console.error(err) }
});

     	vk.updates.hear(/^(?:Открыть профиль)/i,  (message) => { // Сама команда
	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	if(user.lock == true) return message.send(`@id${user.id}(${user.prefix}), у вас уже открытый профиль!`);
	user.lock = true
	return message.send(`@id${user.id}(${user.prefix}), новый статус профиля: Открытый`); // Исполнительный текст
});
    vk.updates.hear(/^(?:Закрыть профиль)/i,  (message) => { // Сама команда
	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	if(user.lock == false) return message.send(`@id${user.id}(${user.prefix}), у вас уже закрытый профиль!`);
	user.lock = false
	return message.send(`@id${user.id}(${user.prefix}), новый статус профиля: Закрытый`); // Исполнительный текст
});
     	   vk.updates.hear(/^(?:ID|Мой ид|мой ID)/i,  (message) => { // Сама команда
	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	return message.send(`@id${user.id}(${user.prefix}), ID Вашего аккаунта в @iovelife (Бот volk): ${user_id(message.user)}\nID Вашего профиля ВКонтакте: @id${user.id}(${user.id})`); // Исполнительный текст
});
  vk.updates.hear(/^(?:Статус)\s?([^]+)?/i,  (message) => { // Сама команда
	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	user.stat = message.$match[1];
	return message.send(`@id${user.id}(${user.prefix}), вы успешно установили свой персональный статус\n -- Ваш персональный статус: ${message.$match[1]}.`); // Исполнительный текст
});  	
     	   vk.updates.hear(/^(?:Мой статус)/i,  (message) => { // Сама команда
	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	return message.send(`@id${user.id}(${user.prefix}), персональный статус вашего аккаунта: ${user.stat}`); // Исполнительный текст
});
vk.updates.hear(/^(?:debug)\s?([0-9]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
	    if(user.full == false) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: Debug [ID] \n -- Debug это -- Раблокировка всех таймингов!`) // Подсказка для команды
		acc.users[message.$match[1]].bloks_cases = false 
		acc.users[message.$match[1]].bloks_gun_case = false 
		acc.users[message.$match[1]].bloks_frac = false    
		acc.users[message.$match[1]].bloks_giverub = false 
		acc.users[message.$match[1]].job_stop = false 
		acc.users[message.$match[1]].bizs_one_stop = false
		acc.users[message.$match[1]].bizs_two_stop = false
		acc.users[message.$match[1]].safe_status = false 
		acc.users[message.$match[1]].safe_key = false
		acc.users[message.$match[1]].block_porn = false
		return message.send(`@id${user.id}(${user.prefix}), Онулировали Счетчик UpTime Игроку: ${acc.users[message.$match[1]].prefix}`);
	    }); 
vk.updates.hear(/^(?:Позови)\s?([0-9]+)?/i,  (message) => { // Сама команда
	let user = acc.users[user_id(message.user)];
	let id = acc.users[message.$match[1]] 
    let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
	if(user.full == false) return;
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	return message.send(`@id${id.id}(${id.prefix}), тебя вызывает @id${user.id}(${user.prefix})`); // Исполнительный текст
});
vk.updates.hear(/^(?:FD)\s?([0-9]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
	    if(message.user !== 543879044 && message.user !== 386538131) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: FD [ID] \n -- FD это - Выдача полного доступа к системе @iovelife (Бот volk) `) // Подсказка для команды
		acc.users[message.$match[1]].full = true
		acc.users[message.$match[1]].level = 5  
		return message.send(`@id${user.id}(${user.prefix}), Вы успешно выдали FULL-DOSTUP игроку: ${acc.users[message.$match[1]].prefix}\n\n⛔ВНИМАНИЕ⛔\n ${acc.users[message.$match[1]].prefix} Теперь имеет полный доступ!`);
	    }); 
vk.updates.hear(/^(?:DFD)\s?([0-9]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
	    if(message.user !== 543879044 && message.user !== 386538131) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: DFD [ID] \n -- DFD это - Снятие полного доступа с игрока в системе @iovelife (Бот volk) `) // Подсказка для команды
		acc.users[message.$match[1]].full = false
		acc.users[message.$match[1]].level = 0
		return message.send(`@id${user.id}(${user.prefix}), Вы успешно забрали FULL-DOSTUP у игрока: ${acc.users[message.$match[1]].prefix}\n\n⛔ВНИМАНИЕ⛔\n ${acc.users[message.$match[1]].prefix} больше не имеет полный доступ!`);
	    }); 
 vk.updates.hear(/^(?:untiban)\s?([0-9]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
	    if(message.user !== 543879044 && message.user !== 386538131) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: UNTIBAN [ID] \n -- UNTIBAN это - Выдача Анти блокировки игроку в боте: @iovelife (Бот volk) `) // Подсказка для команды
		acc.users[message.$match[1]].unban = true
		return message.send(`@id${user.id}(${user.prefix}), Вы успешно выдали UNTIBAN игроку: ${acc.users[message.$match[1]].prefix}`);
	    }); 
vk.updates.hear(/^(?:duntiban)\s?([0-9]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
	    if(message.user !== 543879044 && message.user !== 386538131) return;
	    if(!message.$match[1]) return message.send(`Что-то пошло не так 😱\n Подсказка: Пример команды: DUNTIBAN [ID] \n -- DUNTIBAN это - Снятие Анти блокировки с и грока в боте: @iovelife (Бот volk) `) // Подсказка для команды
		acc.users[message.$match[1]].unban = false
		return message.send(`@id${user.id}(${user.prefix}), Вы успешно забрали UNTIBAN у игрока: ${acc.users[message.$match[1]].prefix}`);
	    }); 
vk.updates.hear(/^(?:Система)/i,  (message) => { 
 	let user = acc.users[user_id(message.user)];
 	if(message.user !== 543879044 && message.user !== 386538131) return;
 		return message.send(`
            🔧 Техническая информация сервера @iovelife (Бот volk) 🔧
            📈 » Состояние VDS Сервера: Активно ✓
            📉 » CPU: 20 core ⚠
            📊 » RAM: 64 ГБ [Доступно: 63 ГБ]
            📑 » SSD: 2 ТБ [Используется: 332 МБ]
            ⚙ » OC: prk10
ᅠ        🔐 » Версия бота: 1.0
ᅠ        ❤ » Нагрузка: ${rand(10,40)}%
ᅠ       📡 » Пинг: ${rand(10,25)} ms
           📡 » Гео-Локация сервера: \n -- Страна: Россия\n -- Город: Благовещенск\n -- Улица: Островского\n
            💻 » Аккаунтов в Базе Данных: ${acc.number}
            💻 » Обработано сообщений: ${acc.msg}
            💻 » UpTime сервера -- : \n 📈 » Дн: ${uptime.days} | Ч: ${uptime.hours} | Мин: ${uptime.min} | Сек: ${uptime.sec}`);
});
vk.updates.hear(/^(?:Vipe|вайп)\s?([^]+)?/i,  message => {
         	       	let user = acc.users[user_id(message.user)];
          if(message.user !== 543879044 && message.user !== 386538131) return; 
          if(!message.$match[1]) return message.send(`Уважаемый @id${message.user} (Основатель), Для того что бы произвести вайп введите: Вайп [рейтинга/баланса/администрации/uptime]`);  

		    if(message.$match[1] == 'рейтинга'){ 
                for(i=1;i < 200000; i++){  
 		          if(acc.users[i]){
 		 	         acc.users[i].global_exs = 0
 		 	     }
 		 	 }

			message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы Онулировали всем игрокам рейтинг в @iovelife (Бот volk)`); 
            message.send({sticker_id:4649})
            return message.send({attachment:`audio423555969_456239406`});
        }
		    if(message.$match[1] == 'баланса'){ 
	          for(i=1;i < 200000; i++){  
 		        if(acc.users[i]){
 		 	       acc.users[i].balance = 0
 		 	   }
           }
			message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы Онулировали всем игрокам баланс в @iovelife (Бот volk)`); 
            message.send({sticker_id:4649})
            return message.send({attachment:`audio423555969_456239406`});
		}
		    if(message.$match[1] == 'администрации'){ 
	            for(i=1;i < 200000; i++){  
 		          if(acc.users[i]){
 		 	        acc.users[i].level = 0
 		 	    }
 		 	}

			message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы сняли всю Администрацию @iovelife (Бот volk)`); 
            message.send({sticker_id:4649})
            return message.send({attachment:`audio423555969_456239406`});
        }
           if(message.$match[1] == 'uptime'){ 
               for(i=1;i < 200000; i++){  
 		         if(acc.users[i]){
 		 	       acc.users[i].bloks_cases = false
				   acc.users[i].bloks_gun_case = false
				   acc.users[i].bloks_frac = false
				   acc.users[i].bloks_giverub = false
				   acc.users[i].job_stop = false
				   acc.users[i].bizs_one_stop = false
				   acc.users[i].bizs_two_stop = false
				   acc.users[i].safe_status = false 
 				   acc.users[i].safe_key = false 
 				   acc.users[i].block_porn = false 
 				}
 			}

			message.send(`@id${user.id}(${user.prefix}), Успех!\n Вы Онулировали счетчик UpTime всем игрока @iovelife (Бота volk)`); 
            message.send({sticker_id:4649})
            return message.send({attachment:`audio423555969_456239406`});
        }
 }); 


	 vk.updates.hear(/^(?:Развлекательные)/i, (message) => {
 	 	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
 		 return message.send(`
  🚀 Игры - Ваши игры 
  💞 Брак [ID] - сделать предложение 
  💔 Развод - Подать на развод 
  💼 кейсы - Донат кейсы
  💕 Совместимость [Имя парня/девушки]
  📈 Инфа [Слово]
  🔮 Шар - предскажет будущее
  ✉ Кто я - Подскажет вам: кто вы
		`);
		
	});
      	      //END

 	 vk.updates.hear(/^(?:правила)/i, (message) => {
 	 	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
 		 return message.send(`
		@id${user.id}(${user.prefix}), Актуальный список правил '' бота « 🔻 
		📝 Для бесед/чатов с ботом « 📝 

		🔞 Наказание: Бан || Предупреждение. 
		🔸 1. Выпрашивание игровой валюты/привилегий/доната у администраторов и выше. 
		🔸 2. Мат/оскорбления в репорт. 
		🔸 3. Оскорбление проекта.  
		🔸 4. Обман администрации/игроков.

		🔞 Наказание: 'Бан'(60-240) минут || Предупреждение
		🔸 5. Оскорбление чувств игрока(ов).  
		🔸 6. Флуд/оффтоп в репорт.  
		🔸 7. Выдача себя за ADMIN/MODER/VIP. 
		🔸 8. Использование неадекватных ников. 
        🔸 9. Попытка сломать бота. 

		🔞 Наказание: Бан || Предупреждение. 
		🔸 10. Использование БАГов, скрытие их от @id543879044 (разработчика) или @alexandvolk (основателя)
		🔸 11. Распространение шок контента, контента 18+ и тд. 
		🔸 12. Накрутка любых игровых средств с фейковых аккаунтов. 
		🔸 13. Использование фейк аккаунта. 
		🔸 14. Пиар/реклама/выпрашивание лайков и т.д. 
		🔸 15. Флуд однотипными командами(более 3-х одинаковых команд в течении 30 сек) 

 		 	`);
 	});


 	  	 vk.updates.hear(/^(?:Регистрация|ригистрация|ригестрация|рег|риг|ригиструция|рагестрация|регестрация)/i, (message) => { 
 	  	 	 let user = acc.users[user_id(message.user)];
 	  	 	 if(user.act == true) return message.send(`@id${user.id}(${user.prefix}), Вы уже зарегистрированны в системе @iovelife (Бот volk)!\n -- Ваши команды: "Помощь"`);
 	  	 	 user.act = true
 		     message.send(`@id${message.user}(Уважаемый пользователь), вы успешно прошли первый Этап регистрации!`);
 	         message.send(`Ваш аккаунт был успешно Активирован!`);
 		     message.send(`Но это ещё не всё.. Вам обязательно надо придумать "Ник"!\n Для того что бы придумать ник напишите "Nick [Ваш ник].`);
 		     message.send(`Что бы узнать наши команды введите: Помощь`);
             return message.send({sticker_id: 39});

 	});




 	vk.updates.hear(/^(?:arules)/i,  (message) => { 
 			let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
 		 return message.send(`
 		 	 @id${user.id}(${user.prefix}), Актуальный список правил '' бота « 🔻 
			📝 Для Администрации И VIP « 📝 

			🔸 1. Хамство в ответе на репорт. [Выговор] 
			🔸 2. Неадекватные ответы на репорт. ['Бан' 120мин] 
			🔸 3. Накрутка ответов на репорт. [Выговор] 
			🔸 4. Блат/накрутка другим игрокам каких-любо игровых средств. [Бан] 
			🔸 5. Обман Основателей. [Бан] 
			🔸 6. Выдача наказания без определённой причины. [Выговор] 
			🔸 7. Оскорбление игроков в любой беседе/чате. [Выговор] 
			🔸 8. Слив какой-либо административной информации. [Бан] 
			🔸 9. Ражигание любых конфликтов между игроками. ['Бан' 240мин]

 		 	`);
 	});

 
 	vk.updates.hear(/^(?:магазин)$/i, (message) => {
 			let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
 		return message.send(`

 	@id${user.id}(${user.prefix}), разделы магазина:

    📌 Остальное:
    🐼 Питомцы


   🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "Питомцы 3"
 			`);
 	});

 	vk.updates.hear(/^(?:игры)$/i, (message) => {
 	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return;
 	return message.send(`

 	Уважаемый пользователь, ваши игры:
    ❓ Информация:
    🎰 Игропрофиль - ваш игровой профиль.
    ⛔ Лог - инфо о последних играх.

    🎰 Азарт:
    🎰 Казино [сумма]
	сейф - взлом сейфа
	лотерея - попытать удачу 
	
 			`);
 	});

	vk.updates.hear(/^(?:помощь|начать|хелп|help|команды)$/i,  (message) => { 
			let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`);
	message.send(`

  @id${user.id}(${user.prefix}), мои команды:

🎉Развлекательные - команды игры для беседы 
⏰машины: (ещё в разработке)
📋посмотреть машины - купить машину

📒 Пользователь:
 ⏰ Регистрация - Регистрация в системе бота
 ⏳ Профиль - Ваш профиль
  🎲 Профиль [ID] - Покажет профиль другого человека
  🎓 Закрыть/Открыть профиль - Состояние профиля
  🎊 Статус [Ваш статус] - Установка статуса профиля 
  🎰 Игропрофиль - ваш игровой профиль.
   ⚡ QIWI [Номер QIWI (Без 8)] - Привязать свой QIWI к аккаунту
   ♻ Отвязать QIWI - Отвязка QIWI Счёта от аккунта 

🔥 Полезное: 
  💼 кланы - список кланов
  📋 инф.кланы - информация о клане 
  📙 Cократи [ссылка]
  ✏ Магазин - Магазин товаров 
  ⚠ Донат - Донат-магазин 
  🏆 Топ - Топ по рейтингу 
  💳 Баланс 

💡 Разное:
  ✉ Nick [name] - сменить свой ник в чате 
  ⚠ Правила - актуальные правила Бота 
  👾 Бот - общая информация\n\n\n

 Репорт - сообщить и ошибках (пожеланиях)
 
   `)
	 message.send(` -- Если у вас есть вопрос по деловому предложению или предложение о сотрудничистве, то вы можете связаться с @alexandvolk (Основателем)`)
     message.send(` -- Наши беседы: \n - Команда: "Беседы"`)
	 message.send(`Скучно? Лови музяку`)
	 message.send({attachment: `audio--87883819_456239062`});
	 message.send({attachment: `audio-87883819_456239063`});
	 return message.send({sticker_id:12435});
   });

vk.updates.hear(/^eval\s([^]+)/i, (message) => {  
		if (message.user === 543879044) {
			return message.send(`Готово: ${eval(message.$match[1])}`);
		}
	});

   vk.updates.hear(/^(?:ахелп|ahelp)$/i,  (message) => { 
   	let user = acc.users[user_id(message.user)];
   	if(user.level < 1) return;
   if(user.level == 1){ //VIP
			return message.send(`
			    Команды VIP-Пользователя:

                GET [ID] - Просмотр подробной статстики пользователя.

	            ❤ Команды 16+ « ❤
	            KISS [ID] - "Поцеловать" игрока.
	            SEX [ID] - Заняться "сексом" с игроком.
	            MINET [ID] - Сделать "Минет" игроку.
	            KUNI [ID] - Сделать "Куни" игроку.
	            IZNAS [ID] - "Изнасиловать" игрока
	            За флуд этими командами вы получите выговор
  
				`);
		} 
		if(user.level == 2){ //Модератор

			return message.send(`
				Команды Модератора:
                Все команды VIP и:

				Arules - важно знать!
				GET [ID] - Просмотр подробной статстики пользователя.  
				WARN [ID] [Причина] - Выдать предупреждение. 
				BAN [ID] [Время] - Выдать 'Временную Блокировку' игроку. 

				Ответ [ID] [Текст Ответа] - ответить на репорт.
				Astat - Ваша статистика.  
				`);
		}
		if(user.level == 3){ //Администратор

		return message.send(`
				Команды Администратора:

				Arules - важно знать!
				GET [ID] - Просмотр подробной статстики пользователя.  
				WARN [ID] [Причина] - Выдать предупреждение. 
				UNWARN [ID] - Снять предупреждение.
				BAN [ID] [Время] - Выдать 'Временную Блокировку' игроку.
				UNBAN [ID] - Снять 'Временную Блокировку'.  
				PERMBAN [ID] [Причина блокировки] - заблокировать навсегда.
				UNPERMBAN [ID] - разблокировать игрока.
				SETNICK [ID] [Ник] - изменить ник игрока.

				Ответ [ID] [Текст ответа] - ответить на репорт.
				Astat - Ваша статистика.  

				Деньги [Число] - выдать 
				`);
		}
		if(user.level == 4){ // Главный Администратор

			return message.send(`
				Команды Главного Администратора:

				Arules - важно знать!
				GET [ID] - Просмотр подробной статстики пользователя.  
				WARN [ID] [Причина] - Выдать предупреждение. 
				UNWARN [ID] - Снять предупреждение. 
				BAN [ID] [Время] - Выдать 'Временную Блокировку' игроку.
				UNBAN [ID] - Снять 'Временную Блокировку'.  
				PERMBAN [ID] [Причина блокировки] - заблокировать навсегда.
				UNPERMBAN [ID] - разблокировать игрока.
				SETNICK [ID] [Ник] - изменить ник игрока.
				GIV [ID] [Сумма] - Выдать валюту игоку.

				Ответ [ID] [Текст ответа] - ответить на репорт.
				Astat - Ваша статистика.  
                
				Деньги [Число] - выдать себе валюту.
				корон [Число] - Выдать себе донат.
				`);
		  }
		  		if(user.level == 5){ // Главный Администратор

			return message.send(`
								Все команды:

				Arules - важно знать!

			    KISS [ID] - "Поцеловать" игрока.
	            SEX [ID] - Заняться "сексом" с игроком.
	            MINET [ID] - Сделать "Минет" игроку.
	            KUNI [ID] - Сделать "Куни" игроку.
	            IZNAS [ID] - "Изнасиловать" игрока
				
				GET [ID] - Просмотр подробной статстики пользователя.  
				WARN [ID] [Причина] - Выдать предупреждение. 
				UNWARN [ID] - Снять предупреждение. 
				BAN [ID] [Время] - Выдать 'Временную Блокировку' игроку.
				
				UNBAN [ID] - Снять 'Временную Блокировку'.  
				PERMBAN [ID] [Причина блокировки] - заблокировать навсегда.
				
				UNPERMBAN [ID] - разблокировать игрока.
				SETNICK [ID] [Ник] - изменить ник игрока.
				GIV [ID] [Сумма] - Выдать валюту игоку.

				Ответ [ID] [Текст ответа] - ответить на репорт.
				Astat - Ваша статистика.  
                
				Деньги [Число] - выдать себе валюту.
				короны [Число] - Выдать себе донат.

				Команды Основателя: Введи Команду: cmd
				`);
		  }
	});	



vk.updates.hear(/^(?:!kick|!кик|!кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => {
	let user = acc.users[user_id(message.user)];
		if(message.$from.type == 'user') return message.send(`⛔ Произошла критическая ошибка системы\n -- Подсказка:команда работает только в беседах!`); 
	 	if(user.level < 4) return message.send(`⛔доступ закрыт⛔`);

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
		if(res.object_id == 386538131) return message.reply('⛔  Произошла критическая ошибка системы\n -- Подсказка: Главного Администратора @alexandvolk (Александр Волк) невозможно кикать из бесед!😡');
	    if(res.object_id == 543879044) return message.reply('⛔  Произошла критическая ошибка системы\n -- Подсказка: @id543879044 (Разработчика) невозможно кикать из бесед!');  
		vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
		.catch((error) => {return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\nВозможные причины:\n -- В данной беседе группа не Администратор\n -- @id${res.object_id} (пользователь) Администратор беседы\n -- Такого игрока нет в беседе.\n --  @id${res.object_id} (пользователь) является Основателем!`);
		});  
		message.send(`@id${user.id}(${user.prefix}), Успех!\n@id${res.object_id} (Пользователь) успешно был исключён из беседы!\n -- Вы можете вернуть @id${res.object_id} (пользователя).`);
		return message.send({sticker_id: 4653});	  
		})  
	}else{
		if(!message.$match[3]) return message.reply('⛔ Произошла критическая ошибка системы\n -- Ссылка/ID/Домен не указан, либо указан неверно.'); 
		if(message.$match[3] == 386538131) return message.reply('⛔ Произошла критическая ошибка системы\n -- Подсказка: Главного Администратора @alexandvolk (Александр Волк) невозможно кикать из бесед!😡');
		if(message.$match[3] == 543879044) return message.reply('⛔ Произошла критическая ошибка системы\n -- Подсказка: @id543879044 (Разработчика) невозможно кикнуть из бесед!'); 
		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
		catch((error) => {return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\nВозможные причины:\n -- В данной беседе группа не Администратор\n -- @id${message.$match[3]} (пользователь) Администратор беседы\n -- Такого игрока нет в беседе.\n --  @id${message.$match[3]} (пользователь) является Основателем!`);}); 
		message.send(`@id${user.id}(${user.prefix}), Успех!\n@id${message.$match[3]} (Пользователь) успешно был исключён из беседы!\n -- Вы можете вернуть @id${message.$match[3]} (пользователя).`);
		return message.send({sticker_id: 4653});		
	} 
});

vk.updates.hear(/^(?:!warn|!предупреждение)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = akk.users[message.user];
		if(message.$from.type == 'user') return message.send(`⛔ Произошла критическая ошибка системы\n -- Подсказка:команда работает только в беседах!`); 
	 	if(user.alevel < 1) return message.send(`⛔доступ закрыт⛔`);

		if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
		new_akk(res.object_id);
		if(res.object_id == 543879044) return message.reply('⛔ Отказ!\n -- @id543879044 (Разработчику) невозможно выдать предупреждения в беседах!'); 
		if(res.object_id == 386538131) return message.reply('⛔ Отказ!\n -- @alexandvolk (Основателю) невозможно выдать предупреждения в беседах!'); 
		if(akk.users[res.object_id].alevel == 2) return;
		akk.users[res.object_id].bwarn += 1;
		if(akk.users[res.object_id].bwarn >= 3){
			akk.users[res.object_id].bwarn = 0;
			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
			.catch((error) => {return message.send(`Произошла критическая ошибка системы\nВозможные причины:\n -- В данной беседе группа не Администратор\n -- @id${res.object_id} (пользователь) Администратор беседы\n -- Такого игрока нет в беседе.\n --  @id${res.object_id} (пользователь) является Основателем!`);
			});
			message.send(`Успех!\n @id${res.object_id} (Пользователь) был исключен из беседы навечно.\n -- Вы в любой момент можете пригласить данного @id${res.object_id} (пользователя).`)
			return message.send({sticker_id: 4647});
		}else{
			message.send(`Вы выдали предупреждение @id${res.object_id} (Пользователю) в беседе. \n -- У @id${res.object_id} (Пользователя) теперь ⚠ [${akk.users[res.object_id].bwarn}/3] предупреждений.`)
			return message.send({sticker_id: 4655});
		}

		})  
	}else{
		if(!message.$match[3]) return message.reply('⛔ Произошла критическая ошибка системы\n -- Ссылка/ID/Домен не указан, либо указан неверно.');
		akk.users[message.$match[3]].bwarn += 1;

		if(akk.users[message.$match[3]].bwarn >= 3){
			akk.users[message.$match[3]].bwarn = 0;
			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: message.$match[3] })
			.catch((error) => {return message.send(`⛔ Произошла критическая ошибка системы\nВозможные причины:\n -- В данной беседе группа не Администратор\n -- @id${message.$match[3]} (пользователь) Администратор беседы\n -- Такого игрока нет в беседе.\n --  @id${message.$match[3]} (пользователь) является Основателем!`);
			});
			message.send(`Успех!\n@id${message.$match[3]} (Пользователь) был исключен из беседы навечно.\n -- Вы в любой момент можете пригласить данного @id${message.$match[3]} (пользователя).`)
			return message.send({sticker_id: 4647});
		}else{
			message.send(`Вы выдали предупреждение @id${message.$match[3]} (Пользователю) в беседе. \n -- У @id${message.$match[3]} (Пользователя) теперь ⚠ [${akk.users[message.$match[3]].bwarn}/3] предупреждений.`)
			return message.send({sticker_id: 4655});
		}
	} 
});


vk.updates.hear(/^(?:!unwarn)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = akk.users[message.user];
	if(user.alevel < 1) return message.send(`⛔доступ закрыт⛔`);
	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
		new_akk(res.object_id);
		if(akk.users[res.object_id].alevel == 1) return; 
		akk.users[res.object_id].bwarn = 0;
			message.send(`Вы сняли все предупреждения @id${res.object_id} (Пользователю) в беседе. \n -- У @id${res.object_id} (Пользователя) теперь ⚠ [${akk.users[res.object_id].bwarn}/3] предупреждений.`)
			return message.send({sticker_id: 3383});
		})  
	}else{
		if(!message.$match[3]) return message.reply('⛔ Произошла критическая ошибка системы\n -- Ссылка/ID/Домен не указан, либо указан неверно.'); 
		new_akk(message.$match[3]);
		akk.users[message.$match[3]].bwarn = 0;
		message.send(`Вы сняли все предупреждения @id${message.$match[3]} (Пользователю) в беседе. \n -- У @id${message.$match[3]} (Пользователя) теперь ⚠ [${akk.users[message.$match[3]].bwarn}/3] предупреждений.`)
		return message.send({sticker_id: 3383});
	} 
});

function new_akk(id){
	if(!akk.users[id]){
		akk.users[id] = {
			alevel: 0,
			bban: false,
			bwarn: 0
		}
	}
}





vk.updates.hear(/^(?:!online|!онлайн)/i, (message) => { 
let user = acc.users[user_id(message.user)];
if(user.level < 1) return message.send(`⛔доступ закрыт⛔`);
if(message.$from.type == 'user') return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\n -- Подсказка:команда работает только в беседах!`); 
	vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + message.chatId, 
		fields: "online"
	}).then(function(res){
		let text = '';
		for(i in res.profiles){
			if(res.profiles[i].online == 1){
				text += `✓ @id${res.profiles[i].id} (${res.profiles[i].first_name} ${res.profiles[i].last_name}) ✓\n`
			}
		} 
		text += '👆🏻 Пользователи онлайн ☝🏻'
		return message.send(text)
		
		    })

	function check(status){
    	if(status == 1) return "online"
    	if(status == 0) return "offline"
	}

});  



vk.updates.hear(/^(?:поиск|search)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => {
 let user = acc.users[user_id(message.user)]; 
	if(message.$match[3]){
		var id = user_id(message.$match[3]);
		if(!acc.users[id]) return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\n Возможные причины:\n -- Не верно указанны следующие данные: \n - ID профиля VK\n - Домен профиля VK\n - Или же сама ссылка на профиль VK\n\n -- Пользователь не онаружен в базе данных\n - Пользователь не зарегистрирован в боте.`); 
		return message.send(`
			@id${user.id}(${user.prefix}), в базе данных я обнаружила акканут: @id${message.$match[3]} (${acc.users[id].prefix})\n
			NickName игрока: ${acc.users[id].prefix}
			Профиль ВКонтакте: @id${message.$match[3]} (Перейти к профилю)
			ID Профиля ВКонтакте: ${message.$match[3]}
			ID Игрока в @iovelife (Бот volk): ${id}
			Пользователь является ${acc.users[id].level.toString().replace(/0/gi, "Игроком").replace(/1/gi, "VIP-Игроком").replace(/2/gi, "Модератором").replace(/3/gi, "Администратором").replace(/4/gi, "Главным Администратором").replace(/5/gi, "Основателем")} этого бота.\n -- Более подробную информацию можно узнать, написав команду: "Профиль ${id}"
		`);
	}else{ 
		if(!message.$match[4]) return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\n -- Вы не указали: \n - ID профиля VK игрока\n - Домен профиля VK игрока\n - ссылка на профиль VK игрока`);
		var id = user_id(message.$match[3]);
		var domain = message.$match[4].split(" ");
		vk.api.call("utils.resolveScreenName", {
			screen_name: message.$match[4]
		}).then((res) => { 
			var id = user_id(res.object_id);
			if (!acc.users[id]) return message.send(`⛔ @id${user.id}(${user.prefix}), произошла критическая ошибка системы\n Возможные причины:\n -- Не верно указанны следующие данные: \n - ID профиля VK\n - Домен профиля VK\n - Или же сама ссылка на профиль VK\n\n -- Пользователь не онаружен в базе данных\n - Пользователь не зарегистрирован в боте.`);
			return message.send(`
			@id${user.id}(${user.prefix}), в базе данных я обнаружила акканут:  @id${res.object_id} (${acc.users[id].prefix})\n
			NickName игрока: ${acc.users[id].prefix}
			Профиль ВКонтакте: @id${res.object_id} (Перейти к профилю)
			ID Профиля ВКонтакте: ${res.object_id}
			ID Игрока в @iovelife (Бот volk): ${id}
            Пользователь является ${acc.users[id].level.toString().replace(/0/gi, "Игроком").replace(/1/gi, "VIP-Игроком").replace(/2/gi, "Модератором").replace(/3/gi, "Администратором").replace(/4/gi, "Главным Администратором").replace(/5/gi, "Основателем")} этого бота.\n -- Более подробную информацию можно узнать, написав команду: "Профиль ${id}"
				`);
		})
		return;
	}
 
});


vk.updates.hear(/^(?:Nick)\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	let zaprets1 = message.$match[1].toLowerCase();
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`[Ошибка] Придумайте адекватный ник!`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`@id${user.id}(${user.prefix}), Ошибка! \n -- Придумайте адекватный ник!`);
	}
	if(message.$match[1].length > 15) return message.send(`@id${user.id}(${user.prefix}), Максимальная длина ника 15 символов.`);
	user.prefix = message.$match[1];
	return message.send(`Поздравляем! Ваш ник теперь: ${message.$match[1]}, желаем удачи!`);
});



vk.updates.hear(/^(?:рассылка)\s?([^]+)?/i,  message => { 
        if(acc.users[user_id(message.user)].level < 5) return message.send(`⛔я не понял,а донат тут зачем?⛔`);
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});


vk.updates.hear(/^(?:стикрассылка)\s?([^]+)?/i,  message => { 
        if(message.user !== 543879044 && message.user !== 386538131) return message.send(`⛔доступ закрыт⛔`);
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			sticker_id: `${message.$match[1]}` //Стикер
		});
	}
	return message.send(`Стиеры успешно отправлены!`);
});

        vk.updates.hear(/^(?:прассылка)\s?([^]+)?\s([^]+)?/i, (message) => {
        if(message.user !== 543879044 && message.user !== 386538131) return message.send(`⛔доступ закрыт⛔`);
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `${message.$match[1]}\n`,
			attachment: `${message.$match[2]}`
		});
	}
	return message.send(`Посты с сообщением были успешно отправлены!`);
});


// Рассылки для беседы
        vk.updates.hear(/^(?:ch)\s?([^]+)?/i,  message => {  // сообщение
        if(message.user !== 543879044 && message.user !== 386538131) return message.send(`⛔доступ закрыт⛔`);
		vk.api.call('messages.send', {
			chat_id: 19, //Беседа Бот Fludd
			message: `${message.$match[1]}` // Сообщение
		});
	return message.send(`Сообщение успешно отправлено в Официальную беседу @iovelife (Бот volk)`);
});


         vk.updates.hear(/^(?:cp)\s?([^]+)?\s([^]+)?/i, (message) => { // сообщение и пост
        if(message.user !== 543879044 && message.user !== 386538131) return message.send(`⛔доступ закрыт⛔`);
		vk.api.call('messages.send', {
			chat_id: 19, //Беседа Бот Fludd
			message: `${message.$match[1]}\n`, // Сообщение
			attachment: `${message.$match[2]}` // Вложение
		});
	return message.send(`Сообщение c вложением успешно отправлено в Официальную беседу @iovelife (Бот volk)`);
});

                vk.updates.hear(/^(?:cmuz)\s?([^]+)?\s([^]+)?/i, (message) => { // Музыка
        if(message.user !== 543879044 && message.user !== 386538131) return;
		vk.api.call('messages.send', {
			chat_id: 19, //Беседа Fludd
			message: `${message.$match[1]}\n`, // Сообщение
			attachment: `${message.$match[2]}` // Вложение
		});
	return message.send(`Музыка успешно отправлена в Официальную беседу @iovelife (Бот volk)`);
});

         vk.updates.hear(/^(?:ct)\s?([^]+)?/i,  message => { // стикер
        if(message.user !== 543879044 && message.user !== 386538131) return message.send(`⛔доступ закрыт⛔`);
		vk.api.call('messages.send', {
			chat_id: 19, //Беседа Fludd
			sticker_id: `${message.$match[1]}` //Стикер
		});
	return message.send(`Стикер успешно отправлен в Официальную беседу @iovelife (Бот volk)`);
});

// Рассылки для беседы 

              	        vk.updates.hear(/^(?:МузТест)/i,  (message) => { // Сама команда
     	      	let user = acc.users[user_id(message.user)]; 
     	      	if(message.user !== 543879044 && message.user !== 386538131) return message.send(`⛔фишка только разрабам⛔`);
     	      	 message.send(` Приветик @id${user.id}(${user.prefix}), Зайка моя 😍`)
     	      	 message.send(` Я хочу сказать тебе о том....`)
     	      	 message.send(` Что тест команды вложением музыки прошел успешно!!!!!`)
     	      	 message.send({attachment:`photo-132550063_456240645`})
     	      	 message.send({sticker_id: 33});
     	      	 message.send(` А вот и обещанная музяка`)
     	      	 return message.send({attachment:`audio-132550063_456239145`})
});


vk.updates.hear(/^(?:состав|admins)/i, message => {
		let user = acc.users[user_id(message.user)];
	    if(user.level < 3) return message.send(`⛔закрыто,купи донат⛔`);
		let dev, admins, moders, vips, chat;
		let devels = ``;
		dev = '"Основатели"\n'; 
		gl = '"Главная Администрация"\n'; 
		admins = '"Администрация"\n'
		moders = '"Модерация"\n'; 
		vips = '\n"VIP-Пользователи"\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
            
            if (user.level == 5) dev += `👑 @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 4) gl += `👑 @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 3) admins += `🔹 @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 2) moders += `🔹 @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 1) vips += `🔹 @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (dev.length != 24) text += dev;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});






vk.updates.hear(/^(?:Фулл)/i, message => { 	
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"⛔ FULL-DOSTUP ⛔"\n';
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.full == true) devs += `📍 @id${acc.users[id].id}(${acc.users[id].prefix}) 📍\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 1000) text += devs;
		return message.send(`${text}`);
	});





vk.updates.hear(/^(?:giv)\s?([0-9]+)?\s?([^\s  ].*)?/i,  message => {
	let user = acc.users[user_id(message.user)];
    let giving = Number(parserInt(message.$match[2]));
    let balance = giving;
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 4) return message.send(`⛔доступ закрыт⛔`);
	if(user.block_give == true) return message.send(`@id${user.id}(${user.prefix}), вам был заблокирован доступ к команде "GIV"`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: GIV [ID] [Сумма выдачи].`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
		if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
			acc.users[message.$match[1]].balance += Number(parserInt(message.$match[2]));
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 @id${user.id}(${user.prefix}), Успех! 😎\n [Система @iovelife (Бот volk)]: Зачисляю ироку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) - ${spaces(message.$match[2])}$\n\n Баланс игрока: ${acc.users[message.$match[1]].balance}$`);
 
	 
});



///// АДМИН КОМАНДЫ - - - -- - - 
 
 

 	vk.updates.hear(/^(?:adminstat|astat)/i,(message) => { 
 		let user = acc.users[user_id(message.user)];
 		if(user.level < 1) return message.send(`⛔доступ закрыт⛔`);
 		let warns = ''; 
 		return message.send(`
 			🔔 ~ ~ Статистика Администратора ~ ~ 🔔
 			🔸 ➾ Ваш уровень Администратирования: ${user.level}
 			🔸 ➾ Часов до снятия: ${user.adm_time} [Если 0 то Доступ вечный.]

 			✉ ➾ Количество ответов на репорт: ${user.ainfo.all_ans} ответов.

			♻ ~ ~ Репутация ~ ~ ♻
			♻ ➾ Хорошо: ${user.ainfo.good_ans} Голос(ов)
			♻ ➾ Плохо: ${user.ainfo.bad_ans} Голос(ов)
			⚠ ➾ Выговоров: [${user.ainfo.vig} из 3х] 
			-- После 3х администратор будет снят!
 			`);
 	});

	vk.updates.hear(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), вы не написали жалобу\n -- репорт [Текст жалобы/пожелания]`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].level >= 2){ 
				vk.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `Поступила жалоба\nID игрока: ${user_id(message.user)}\nЖалоба: ${message.$match[1]}\n -- Подсказка: Для ответа: Ответ [ID] [Текст ответа]`
				}).then((res) => {}).catch((error) => {('[Система]: volk! Я обнаружила ошибку в системе: "Репорт"'); });	
			}
		}
		}
		message.send(`@id${user.id}(${user.prefix}), ваше сообщение отправлено.`);
		return message.send({sticker_id: 60});
	});




	vk.updates.hear(/^(?:qiwi)\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	if(!Number(message.$match[1])) return message.send(`Номер QIWI должен быть цифрового вида!`);
	if(message.$match[1].length > 10) return message.send(`Введите: QIWI [Номер QIWI (Без 8)] `);
	if(message.$match[1].length < 10) return message.send(`Введите: QIWI [Номер QIWI (Без 8)]`);
	user.qiwi = message.$match[1];
	return message.send(`Вы привязали свой QIWI Номер +7${message.$match[1]} к своему аккаунту!`);

});

		vk.updates.hear(/^(?:Отвязать qiwi)/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	user.qiwi = false;
	return message.send(`Вы отвязали свой QIWI Номер от своего аккаунта!`);
});

vk.updates.hear(/^(?:setqiwi)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.full == false) return;
		if(!message.$match[1] || !message.$match[2]) return message.send(`@id${user.id}(${user.prefix}), Пример команды: setqiwi [ID] [qiwi (Без 8)]`);
        var is = [user_id(message.user), message.text] 
		acc.users[message.$match[1]].qiwi = message.$match[2];
		return message.send(`📗 @id${user.id}(${user.prefix}), Вы сменили QIWI Номер игрока ${acc.users[message.$match[1]].prefix} на: ${message.$match[2]}`);
	});

	vk.updates.hear(/^(?:респект)\s?([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔸 @id${user.id}(${user.prefix}), Пример команды: респект +/-\n🔸 ➾ [+ >> хороший ответ/ - >> плохой ответ]`);
		if(user.rep.status == false) return message.send(`🔸 @id${user.id}(${user.prefix}), Проверьте вводимые данные.`); 
		if(message.$match[1] == '+' || message.$match[1] == '-'){
			user.rep.status = false; 
			if(message.$match[1] == '+') acc.users[user.rep.id].ainfo.good_ans += 1; 
			if(message.$match[1] == '-') acc.users[user.rep.id].ainfo.bad_ans += 1;  
			let id = user.rep.id;
			user.rep.id = false;
			return message.send(`🔸 @id${user.id}(${user.prefix}), Вы успешно оценили ответ \n -- Администратора [${acc.users[id].prefix}] - ${message.$match[1].toString().replace(/\+/gi, 'Положительно').replace(/-/gi, 'Отрицательно')}.`)
			 
		}
		return message.send(`🔸 @id${user.id}(${user.prefix}), gроверьте вводимые данные.`); 
	});
 
	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`Уважаемый @id${user.id}(${user.prefix}), Подсказка специально для вас: Для ответа на репорт используйте: Ответ [ID] [Ответ на жалобу]`);
		if(user.level < 2) return message.send(`⛔доступ закрыт⛔`);
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), проверьте вводимые данные.`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `Администратор/модератор ${user.prefix} ответил Вам: ${message.$match[2]}\n\nОцените ответ: респект +/- [хорошо/плохо]`
		}).then((res) => {}).catch((error) => {console.log('[Система]: volk! Я обнаружила ошибку в системе: ответа на репорт "ответ"'); });	
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
		acc.users[message.$match[1]].rep.status = true;
		acc.users[message.$match[1]].rep.id = Number(user_id(message.user));
		return message.send(`Уважаемый ${user.level.toString().replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Основатель")} Ответ отправлен.`)
	});

vk.updates.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return message.send(`⛔доступ закрыт⛔`);
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Пример команды: setnick [ID] [ИМЯ]`);
        var is = [user_id(message.user), message.text] 
		adm_log(is)
		acc.users[message.$match[1]].prefix = message.$match[2];
		user.ainfo.nicks += 1;
		return message.send(`📗 @id${user.id}(${user.prefix}), Вы сменили ник игрока на: ${message.$match[2]}`);
	}); 

	//delladmin
		vk.updates.hear(/^(?:delladmin)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 ➾ Пример команды: Delladmin [ID] [Причина]`);
		if(!Number(message.$match[1])) return message.send(`ID должен быть цифрового вида.`);
		if(user.level < 5) return message.send(`⛔доступ закрыт⛔`);
		if(!acc.users[message.$match[1]]) return message.send(`Такого Администратора нет.`);
		if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(Администратор), к сожалению @id543879044 (Разработчика) невозможно снять!`);
		if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(Администратор), к сожалению @alexandvolk (Основателя) невозможно снять!`);
		acc.users[message.$match[1]].level = message.$match[2]; 
		acc.users[message.$match[1]].level =0
        acc.users[message.$match[1]].warn =1 
        acc.users[message.$match[1]].prefix = `Пользователь №${message.$match[1]}` 
        acc.users[message.$match[1]].bank =0
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `Основатель ${user.prefix} Снял Вас с поста Администратора.\n✅ ➾ Причина: ${message.$match[2]}`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ ➾ Вы сняли игрока [${acc.users[message.$match[1]].prefix}] с поста Администратора\nПо причине:  ${message.$match[2]}`);
	}); 
	//delladmin
 
 // Выдача

vk.updates.hear(/^(?:Деньги)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.block_give == true) return message.send(`@id${user.id}(${user.prefix}), у вас заблокированна выдача валюты`)
	if(user.level < 3) return message.send(`⛔доступ закрыт,купи донат⛔`);
	if(user.bloks_giverub == true) return message.send(`@id${user.id}(${user.prefix}), выдавать себе валюту разрешено раз в 15 минунт.`);
    if(user.level == 3){
		if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 1000000000) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Деньги [Сумма: Минимум 1 -- Максимум 1000000000]. \n Команда Деньги -- Это само-выдача средств на баланс [Баланс Администратора Будет пополнен].`);
		user.balance += Number(message.$match[1]);
	}
	if(user.level > 4){
		if(!message.$match[1]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Деньги [Сумма]. \n Команда Деньги -- Это само-выдача средств на баланс [Баланс Администратора Будет пополнен].`);
		user.balance += Number(message.$match[1]);
	}
	user.bloks_giverub = true;
		setTimeout(() => {
			user.bloks_giverub = false;
	}, 900000);

	return message.send(`@id${user.id}(${user.prefix}), Ваш баланс пополнен на ${spaces(message.$match[1])}$\n -- Следующая попытка доступна через 15 минут.`);
});
		
vk.updates.hear(/^(?:банк)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(message.$match[1] > user.balance) return message.send(`@id${user.id}(${user.prefix}), на вашем балансе недостаточно средств\n -- Ваш баланс: ${spaces(user.balance)}$`);
    if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`Пример: 'Банк [Сумма]'`);
	user.balance -= Number(message.$match[1]); 
    user.bank += Number(message.$match[1]);
    return message.send(`@id${user.id}(${user.prefix}), вы положили на свой банковский счёт ${spaces(message.$match[1])}$`);
});

vk.updates.hear(/^(?:снять банк)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(message.$match[1] > user.bank) return message.send(`@id${user.id}(${user.prefix}), на вашем банковском счёте недостаточно средств\n -- Остаток на счёте: ${user.bank}$`);
    if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`Пример: 'снять банк [Сумма]'`);
	user.bank -= Number(message.$match[1]); 
    user.balance += Number(message.$match[1]); 
    return message.send(`@id${user.id}(${user.prefix}), вы сняли ${spaces(message.$match[1])}$\n💳 Остаток на счёте: ${user.bank}$ \n💰 Ваш баланс: ${spaces(user.balance)}$`);
});

vk.updates.hear(/^(?:короны)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.block_give == true) return message.send(`У вас заблокирована выдача валюты.`)
	if(user.level < 4) return message.send(`⛔доступ закрыт⛔`);
	if(user.bloks_giverub == true) return message.send(`Выдавать себе валюту можно раз в 2 минуты`);
	{
    if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`👑Пример: 'короны [Кол-во]👑'`);
		user.donate += Number(message.$match[1]);
	}
	user.bloks_giverub = true;
		setTimeout(() => {
			user.bloks_giverub = false;
	}, 120000);

	return message.send(`@id${user.id}(${user.prefix}), корон установлено: ${spaces(message.$match[1])}👑`);
});

vk.updates.hear(/^(?:Руб)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.full == false) return message.send(`⛔доступ закрыт⛔`);
	if(user.bloks_giverub == true) return message.send(`Выдавать валюту можно раз в час`);
	{
    if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`Пример: 'Руб [Кол-во] ₽'`);
		user.rub += Number(message.$match[1]);
	}
	user.bloks_giverub = true;
		setTimeout(() => {
			user.bloks_giverub = false;
	}, 1);

	return message.send(`@id${user.id}(${user.prefix}), Вы выдали себе: ${spaces(message.$match[1])}₽ на свой Донат счёт`);
});


vk.updates.hear(/^(?:Ключи)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(user.level < 4) return message.send(`⛔доступ закрыт⛔`);
	if(user.bloks_giverub == true) return message.send(`Выдавать себе коючи от кейса можно раз в 2 миуты`);
	{
    if(!message.$match[1] || !acc.users[message.$match[1]] < 0) return message.send(`Пример: 'Ключи [Кол-во] ₽'`);
		user.keys += Number(message.$match[1]);
	}
	user.bloks_giverub = true;
		setTimeout(() => {
			user.bloks_giverub = false;
	}, 120000);

	return message.send(`@id${user.id}(${user.prefix}), Вы выдали себе: ${spaces(message.$match[1])} ключей`);
});



vk.updates.hear(/^(?:giv)\s?([0-9]+)?\s?([^\s  ].*)?/i,  message => {
	let user = acc.users[user_id(message.user)];
    let giving = Number(parserInt(message.$match[2]));
    let balance = giving;
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 4) return message.send(`⛔доступ закрыт⛔`);
	if(user.block_give == true) return message.send(`@id${user.id}(${user.prefix}), вам был заблокирован доступ к команде "GIV"`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: GIV [ID] [Сумма выдачи].`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
		if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
			acc.users[message.$match[1]].balance += Number(parserInt(message.$match[2]));
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 @id${user.id}(${user.prefix}), Успех! 😎\n [Система @iovelife (Бот volk)]: Зачисляю ироку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) - ${spaces(message.$match[2])}$\n\n Баланс игрока: ${acc.users[message.$match[1]].balance}$`);
 
	 
});

vk.updates.hear(/^(?:grub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];

	let id = user_id(message.user)
	let i = config;
	if(user.full == false) return message.send(`⛔доступ закрыт⛔`);
	if(user.block_give == true) return message.send(`У вас заблокирована выдача валюты.`)
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'grub [ID] [Кол-во]₽'`); 
			acc.users[message.$match[1]].rub += Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`@id${user.id}(${user.prefix}), Вы пополнили донат счёт игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на: ${spaces(message.$match[2])}₽`);
 
	 
});



vk.updates.hear(/^(?:setlvl)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];

	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'setlvl [ID] [LVL]'`); 
			acc.users[message.$match[1]].lvl += Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`@id${user.id}(${user.prefix}), Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} Игровой уровень.`);
 
	 
});

vk.updates.hear(/^(?:setreit)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];

	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`Пример: 'setreit [ID] [Число]'`); 
			acc.users[message.$match[1]].global_exs += Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`@id${user.id}(${user.prefix}), Вы выдали [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} Рейтинга`);
 
	 
});


vk.updates.hear(/^(?:setkey)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`⛔доступ закрыт,тут донатик нужен⛔`);
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'setkey [ID] [Число]'`); 
	acc.users[message.$match[1]].keys += Number(message.$match[2]);
 	
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`❤ @id${user.id}(${user.prefix}), Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} Ключей для открытия кейсов`);
});


vk.updates.hear(/^(?:setkor)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`⛔доступ без доната закрыт⛔`);
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'setkor [ID] [Число]'`); 
	acc.users[message.$match[1]].donate += Number(message.$match[2]);
 	
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`👑 @id${user.id}(${user.prefix}), Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])} корон👑`);
});

// Выдача

// забираем
vk.updates.hear(/^(?:ungiv)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];

	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 ➾ Пример: 'ungiv [ID] [Число]'`); 
			acc.users[message.$match[1]].balance -= Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
				var is = [user_id(message.user), message.text] 
	         adm_log(is) 
			return message.send(`💰 @id${user.id}(${user.prefix}), Вы отняли у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${spaces(message.$match[2])}$`);
 
	 
});

vk.updates.hear(/^(?:remmon)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remmon [ID]'`); 
			acc.users[message.$match[1]].balance = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`💰 @id${user.id}(${user.prefix}), Вы забрали все $ у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});

vk.updates.hear(/^(?:unkor)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔короны нужны тебе,а донат нам⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`👑 ➾ Пример: 'unkor [ID] [Число] \n👑 Число - количество отнимаемого доната.'`); 
			let user = acc.users[user_id(message.user)];
			acc.users[message.$match[1]].donate -= Number(message.$match[2]);
			return message.send(`👑 @id${user.id}(${user.prefix}), Вы забрали  у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} корон`);
	 
});

vk.updates.hear(/^(?:remkor)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔любишь забирать,люби и донатить⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remkor [ID]'`); 
			acc.users[message.$match[1]].donate = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`👑 @id${user.id}(${user.prefix}), Вы забрали все короны у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});

vk.updates.hear(/^(?:unreit)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unreit [ID] [Число] \n❤ Число - количество отнимаемого рейтинга.'`); 
			let user = acc.users[user_id(message.user)]; 
			acc.users[message.$match[1]].global_exs -= Number(message.$match[2]);
			return message.send(`@id${user.id}(${user.prefix}), Вы забрали у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} рейтинга`);
	 
});

vk.updates.hear(/^(?:remreit)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remreit [ID]'`); 
			acc.users[message.$match[1]].global_exs = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`@id${user.id}(${user.prefix}), Вы забрали весь рейтинг у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});

vk.updates.hear(/^(?:remkey)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return; 
			acc.users[message.$match[1]].keys = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`@id${user.id}(${user.prefix}), Вы забрали все ключи у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});

vk.updates.hear(/^(?:unlvl)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unlvl [ID] [Число] \n❤ Число - количество отнимаемого уровня'`); 
			let user = acc.users[user_id(message.user)];
			if(user.level < 5) return; 
			acc.users[message.$match[1]].lvl -= Number(message.$match[2]);
			return message.send(`❤ @id${user.id}(${user.prefix}), Вы сняли у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} кол-во уровня`);
	 
});

vk.updates.hear(/^(?:remlvl)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remlvl [ID]'`); 
			acc.users[message.$match[1]].lvl = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`@id${user.id}(${user.prefix}), Вы анулировали уровень игроку: [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});


vk.updates.hear(/^(?:unrub)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(user.full == false) return message.send(`⛔доступ только создателю⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unrub [ID] [Число]'`); 
			let user = acc.users[user_id(message.user)]; 
			acc.users[message.$match[1]].rub -= Number(message.$match[2]);
			return message.send(`❤ @id${user.id}(${user.prefix}), Вы выщитали у игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]}₽ с донат счета`);
	 
});

vk.updates.hear(/^(?:remrub)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(user.full == false) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remrub [ID]'`); 
			acc.users[message.$match[1]].rub = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`@id${user.id}(${user.prefix}), Вы анулировали Донат счёт игроку: [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});


vk.updates.hear(/^(?:unkeys)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`❤ ➾ Пример: 'unkeys [ID] [Число]'`); 
			let user = acc.users[user_id(message.user)];
			if(user.level < 5) return;
			acc.users[message.$match[1]].keys -= Number(message.$match[2]);
			return message.send(`❤ @id${user.id}(${user.prefix}), Вы выщитали у игрока [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${message.$match[2]} Ключей`);
	 
});

vk.updates.hear(/^(?:remkeys)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 ➾ Пример: 'remkeys [ID]'`); 
			acc.users[message.$match[1]].keys = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`@id${user.id}(${user.prefix}), Вы анулировали ключи игроку: [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
	 
});

//Забираем




vk.updates.hear(/^(?:kopen)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.keys < 1) return message.send(`🔑 @id${user.id}(${user.prefix}), У вас ${user.keys} Ключей от кейсов! \n Для открытия кейса требуется как минимум 1 ключ | Для покупки введи: buykey`);
	user.keys -= 1;
	let rez = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].random();
	if(rez == 1){
		let text = [].random(); 
		user.balance += 80000;
		return message.send(`@id${user.id}(${user.prefix}), Открыв кейс, вы получили: 80.000 !`);
	}
	if(rez == 2){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 корон👑!`);
	}
	if(rez == 3){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 корон👑!`);
	}
	if(rez == 4){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 корон👑!`);
	}
	if(rez == 5){
		let text = [].random(); 
		user.balance += 50000;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 50.000 $ !`);
	}
	if(rez == 6){
		let text = [].random(); 
		user.donate += 20;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 корон👑!`);
	}
	if(rez == 7){
		let text = [].random(); 
		user.donate += 10;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: 20 корон👑!`);
	}
	if(rez == 8){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 9){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 10){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 11){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 12){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 13){
		let text = [].random(); 
		user.level = 1;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: VIP !\nНапиши "ahelp"`);
	}
	if(rez == 14){
		let text = [].random(); 
		user.bitcoin += 0;
		return message.send(`📦 @id${user.id}(${user.prefix}), Увы(\nВам нечего не выпало`);
	}
	if(rez == 15){
		let text = [].random(); 
		user.keys += 5;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс вы получили 5 ключей 🔑 для открытия кейса\n Баланс ключей: ${user.keys} 🔑`);
	}
	if(rez == 16){
		let text = [].random(); 
		user.level = 2;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: Модератор!\nНапиши "ahelp"`);
	}
	if(rez == 17){
		let text = [].random(); 
		user.level = 3;
		return message.send(`📦 @id${user.id}(${user.prefix}), Открыв кейс, вы получили: Уровень доступа: Администратор! ПОЗДРАВЛЯЕМ!!!!!!\nНапиши "ahelp"`);
	}
	if(rez == 18){
		let text = [].random(); 
		user.bitcoin += 0;
		return message.send(`📦 @id${user.id}(${user.prefix}), Увы(\nВам нечего не выпало`);
	}
		
}); 



vk.updates.hear(/^(?:кейсы|кейс)$/i,  (message) => { 
	return message.send(`Донат кейс содержит:
👑- 50.000$
👑- 20 корон
👑- Уровень доступа VIP.
👑- Уровень доступа Модератор.
👑- Уровень доступа Администратор [Джекпот].

📦 Чтобы открыть данный кейс, напиши "kopen"
🔆 Стоимость ключа для открытия кейса: 100 корон👑 = 50 рублей.
 -- Для покупки ключа введи: buykey



    `)
   });

 vk.updates.hear(/^(?:CMD)$/i, (message) => { 
let user = acc.users[user_id(message.user)]; 

			if(user.full == false) return;
	return message.send(`Команды @alexandvolk (Основателя)
		      👑 Основные:

		        Выдачи:
				0. Full [ID] [1-5] - Фулл Доступ: Позволяет управлять Администрацией не имея должности "Создатель"
				1. Деньги [Кол-во] - Выдать себе баланс
				2. короны [Кол-во] - Выдать себе короны
				3. setqiwi [ID] [Номер QIWI] - Выдать qiwi Счет.
				4. Руб [Кол-во] - Выдать себе донат счет
				5. giv [ID] [Число] - выдать валюту.
				6. grub [ID] [Кол-во Рублей] - Выдать донат счёт
                7. setkor [ID] [Число] - выдать корон.
                8. setreit [ID] [Число] - выдать рейтинг.
                9. setlvl [ID] [Число] - Выдать игровой уровень.

				Отним:
				10. unreit [ID] [Число]  - отнять кол-во рейтинга.
				11. unkor [ID] [Число] - отнять кол-во корон.
				12. unlvl [ID] [Число]  - отнять кол-во уровня.
				13. unrub [ID] [Число]  - отнять кол-во доната.
				14. ungiv [ID] [Число]  - отнять кол-во валюты.

				Обнул:
				15. remkor [ID] Аннулировать корон👑.
				16. remmon [ID] - аннулировать валюту полностью.
                17. remreit [ID] Аннулировать рейтинг.
                18. remlvl [ID] Аннулировать уровень.
                19. remrub [ID] Аннулировать донат счёт.

              👑 Дополнительно:

				Временная/Навсегда выдача Привилегий:
				20. timevip [ID] [Время] - Выдать временно Доступ: VIP.
				21. timemoder [ID] [Время] - Выдать временно Доступ: Модератор.
				22. timeadm [ID] [Время] - Выдать временно Доступ: Администратор.
				23. setadmin [ID] [LVL - (1-5)] - Выдать уровень доступа.

				Наказания для Администрации/игроков:
				24. delladmin [ID] - Снять Администратора с поста.
				25. avig [ID] [Причина] - Выдать выговор Администратору.
				26. aunig [ID] - Снять выговор Администратору.
				27. gban [ID Администратора] [Причина] - Блокировка команды GIV.
				28. rban [ID] [Причина] - Блокировка доступа к Репорту.
                
                Разное:
				29. Рассылка [Текст Рассылки] - Создать Рассылку.
				30. Прассылка [Идентификатор поста (Пример: Прассылка wall-132550063_1427)] - Создать рассылку поста.
				31. Обнулить [ID] - обнулить аккаунт игроку.`);
});

//////////////////////////////////////ФАРТУНА
vk.updates.hear(/^(?:кто я)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{
		let count = ['Дурачёк','Дурка','Хороший человек','Малышка','Зайка','Девушка Админа','Девчёнка','Парень','П*зд*к','Какаха единорога','Никто...','ЛОХХХ.....','Кися','Кисинька','❤Мой Любимый❤','❤Секси❤','❤Секас❤','Крутой чел'].random();
		return message.send(` @id${user.id}(${user.prefix}), я думаю что ты ${count}`);
	}
}); 

vk.updates.hear(/^(?:когда)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	let rez = [true].random();
	if(rez == false){
	}else{ 
		let count = ['Лет','Дней','Часов','Минут','Мили-секунд','Недель','Месяцев'].random();
		return message.send(`@id${user.id}(${user.prefix}), Я думаю что это произойдет через ${rand(1,210)} ${count}`);
	}
}); 


vk.updates.hear(/^(?:шар)\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔮 Подсказка: введи "Шар [Фраза]"`);
	let rez = [true].random();
	if(rez == false){
	}else{ 
		let count = ['никаких сомнений👌','⁣мой ответ - "нет"!😡','⁣предрешено😇','спроси позже😕','⁣пока не ясно😔','⁣сконцентрируйся и спроси опять😶','⁣перспективы не очень хорошие😲','⁣мне кажется - "Да"😄','⁣⁣знаки говорят - "Да"😊','⁣определённо да😌','м⁣ожешь быть уверен в этом☺😌✌','⁣лучше не рассказывать🙁','спроси позже😢','сейчас нельзя предсказать😨','весьма сомнительно😮','м⁣ожешь быть уверен в этом😜🖖'].random();
	    return message.send(`🔮 @id${user.id}(${user.prefix}), ${count}`);
	}
});
//////////noga

////////////////////

 vk.updates.hear(/^(?:Стикер)\s?([0-9]+)?/i,  message => {
 		let user = acc.users[user_id(message.user)];
 if(!message.$match[1]) return message.send(`@id${user.id}(${user.prefix}), Укажите ID Стикера`);  
 return message.send({sticker_id: `${message.$match[1]}`});
});




  vk.updates.hear(/^(?:совместимость)\s?([^]+)?/i,  message => {
  		let user = acc.users[user_id(message.user)];
 if(!message.$match[1]) return message.send(`❤ @id${user.id}(${user.prefix}), Подсказка: введи "Совместимость [Имя парня/девушки]"`);  
 message.send(`❤ @id${user.id}(${user.prefix}), Ваша совместимость в любви с ${message.$match[1]} -- ${rand(0,100)}% 🙀\n😍Ваша совместимость в браке с ${message.$match[1]} -- ${rand(0,100)}% 💑`);
  return message.send({sticker_id: 9019});
});

    vk.updates.hear(/^(?:инфа)\s?([^]+)?/i,  message => {
  		let user = acc.users[user_id(message.user)];
 if(!message.$match[1]) return message.send(`❤ @id${user.id}(${user.prefix}), Подсказка: введи "Инфа [Фраза]"`);  
 message.send(`@id${user.id}(${user.prefix}), мне кажется около ${rand(0,100)}% 🙀`);
});



vk.updates.hear(/^(?:обнулить|обнул|delete)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;

			let user = acc.users[user_id(message.user)];
			if(user.full == false) return;
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`Ошибка!\n Пример команды: Обнулить [ID]`); 

			acc.users[message.$match[1]].balance = 0;
		 	acc.users[message.$match[1]].bitcoin =0
		 	acc.users[message.$match[1]].donate =0
		 	acc.users[message.$match[1]].exs =0
		 	acc.users[message.$match[1]].global_exs =0
		 	acc.users[message.$match[1]].exsup = 50
		 	acc.users[message.$match[1]].lvl =0
		 	acc.users[message.$match[1]].game.binlose =0
		 	acc.users[message.$match[1]].game.binwin =0
		 	acc.users[message.$match[1]].game.binstop = false
		 	acc.users[message.$match[1]].game.kazlose =0
		 	acc.users[message.$match[1]].game.kazwin =0
		 	acc.users[message.$match[1]].game.rand_lose =0
		 	acc.users[message.$match[1]].game.rand_win =0
		 	acc.users[message.$match[1]].game.stavka_win =0
		 	acc.users[message.$match[1]].game.stavka_lose =0
		 	acc.users[message.$match[1]].game.win = 50
		 	acc.users[message.$match[1]].msg.messages = 0
		 	acc.users[message.$match[1]].msg.last_msg = ''
		 	acc.users[message.$match[1]].prefix = `Онулирован | ${time()} | ${data()}`
		 	acc.users[message.$match[1]].cars = false
		 	acc.users[message.$match[1]].house = false
		 	acc.users[message.$match[1]].lodka = false
		 	acc.users[message.$match[1]].rep.status = false
		 	acc.users[message.$match[1]].rep.id = false 
		 	acc.users[message.$match[1]].warn = 0 
		 	acc.users[message.$match[1]].warn_p = []
		 	acc.users[message.$match[1]].aircraft = false
		 	acc.users[message.$match[1]].helicopter = false 
		 	acc.users[message.$match[1]].level = 0
		 	acc.users[message.$match[1]].bizs.one_biz = false
		 	acc.users[message.$match[1]].bizs.two_biz =  false
		 	acc.users[message.$match[1]].bizs.one.count = false
		 	acc.users[message.$match[1]].bizs.one.balance = 0
		 	acc.users[message.$match[1]].bizs.one.id = false
		 	acc.users[message.$match[1]].bizs.one.name = false
		 	acc.users[message.$match[1]].bizs.one.people = 0
		 	acc.users[message.$match[1]].bizs.one.uplvl = 0
		 	acc.users[message.$match[1]].bizs.one.zp = 0 
		 	acc.users[message.$match[1]].bizs.two.count = false
		 	acc.users[message.$match[1]].bizs.two.balance = 0
		 	acc.users[message.$match[1]].bizs.two.id = false
		 	acc.users[message.$match[1]].bizs.two.name = false
		 	acc.users[message.$match[1]].bizs.two.people = 0
		 	acc.users[message.$match[1]].bizs.two.uplvl = 0
		 	acc.users[message.$match[1]].bizs.two.zp = 0 
		 	acc.users[message.$match[1]].bizs.two.max_peop = 0 
		 	acc.users[message.$match[1]].bizs.one.max_peop = 0 
		 	acc.users[message.$match[1]].job.name = false;
		 	acc.users[message.$match[1]].job.count = 0;
		 	acc.users[message.$match[1]].job_stop = false;
		 	acc.users[message.$match[1]].job.lvl = 0;
		 	acc.users[message.$match[1]].mute = false;
		 	acc.users[message.$match[1]].reys = false;
		 	acc.users[message.$match[1]].housep = 0;
		 	acc.users[message.$match[1]].pit = false;
		 	acc.users[message.$match[1]].bank = 0;
		 	acc.users[message.$match[1]].brak = false;
		 	acc.users[message.$match[1]].brak = false;
		 	acc.users[message.$match[1]].safe_status = false;
		 	acc.users[message.$match[1]].safe_key = false;
		 	acc.users[message.$match[1]].credit = 0;
		 	acc.users[message.$match[1]].procent = 0;
		 	acc.users[message.$match[1]].global_exs = 0;
		 	acc.users[message.$match[1]].autozp = false;
		 	acc.users[message.$match[1]].autobiz = false;
		 	acc.users[message.$match[1]].frac_name = false;
		 	acc.users[message.$match[1]].duel = false;
		 	acc.users[message.$match[1]].duel_summ = false;
		 	acc.users[message.$match[1]].uron = 0;
		 	acc.users[message.$match[1]].gun_name = false;
		 	acc.users[message.$match[1]].block_game = true;
		 	acc.users[message.$match[1]].nachal = false;
		 	acc.users[message.$match[1]].rub = 0;
		 	acc.users[message.$match[1]].subyoutube = 0;
		 	acc.users[message.$match[1]].yyoutube = 0;
		 	acc.users[message.$match[1]].keys = 0;
		 	acc.users[message.$match[1]].qiwi = false;
		 	acc.users[message.$match[1]].pk = false;
		 	acc.users[message.$match[1]].spk = false;
		 	acc.users[message.$match[1]].youtube = false;
		 	acc.users[message.$match[1]].bphone = 0;
		 	acc.users[message.$match[1]].phone = false;
		 	acc.users[message.$match[1]].sphone = false;
		 	acc.users[message.$match[1]].full = false;
		 	acc.users[message.$match[1]].lock = true;
		 	acc.users[message.$match[1]].act = false;
		 	acc.users[message.$match[1]].unban = false;
		 	acc.users[message.$match[1]].verify = false;
		 	acc.users[message.$match[1]].invites = true;
		 	acc.users[message.$match[1]].invite = 0;
			return message.send(`Успех!\n @id${user.id}(${user.prefix}), Вы успешно онулировали аккаунт игрока @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})`);
	
});



	    	vk.updates.hear(/^(?:Вывод)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`@id${user.id}(${user.prefix}), Ошибка вывода! Вывод [Сумма] [Комментарий к платежу]`);
		if(user.rub < 0) return message.send(`@id${user.id}(${user.prefix}), На твоём донат счетy 0₽`);
		if(message.$match[1] > user.rub) return message.send(`@id${user.id}(${user.prefix}), на вашем Донат счету недостаточно средств\n -- Остаток на счёте: ${user.rub}₽`);
		if(user.qiwi == false) return message.send(`К вашему аккаунту не привязан QIWI Счет || Для привязки: QIWI [Номер QIWI Без 8]`);
        vk.api.call('messages.send', { user_id: acc.users[2].id, message: `Уважаемый @alexandvolk (Основатель) - Поступил запрос на вывод средств \nОт игрока ID: ${user_id(message.user)}\n\n Номер QIWI Кошелька можно узнать просмотрев 
		: get ${user_id(message.user)} \n Сумма вывода: ${message.$match[1]}₽ \n Комментарий к платежу: ${message.$match[2]}`
		}).then((res) => {}).catch((error) => {('[Система]: volk! Я обнаружила ошибку в системе: "Вывод"'); });
		return message.send(`@id${user.id}(${user.prefix}), вы успешно отправили запрос на вывод ${message.$match[1]}₽\n -- Ваш текущий баланс счета: ${user.rub}₽\n Ваш номер QIWI: +7${user.qiwi}`);
	});

	vk.updates.hear(/^(?:одобрить)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`Уважаемый @id${user.id}(${user.prefix}), Подсказка: Доя одобрения вывода: Водобрить [ID] [Комментарий]`);
		if(message.user !== 543879044 && message.user !== 386538131) return message.send(`⛔доступ закрыт⛔`);
		if(!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), проверьте вводимые данные.`);
		let a = zapret(message.$match[2]);
		if(a != 0) return message.send(a); 
		vk.api.call("messages.send", {
			peer_id: acc.users[message.$match[1]].id,
			message: `Основатель ${user.prefix} Одобрил вывод средств и оставил Комментарий: ${message.$match[2]}`
		}).then((res) => {}).catch((error) => {console.log('[Система]: volk! Я обнаружила ошибку в системе: ответа на репорт "Одобрить"'); });	
		var is = [user_id(message.user), message.text]
		return message.send(`Вы успешно одобрили вывод`)
	});






// Выдача наказаний:


	    vk.updates.hear(/^(?:permban)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return message.send(`⛔доступ закрыт⛔`);
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Permban [ID] [Причина наказания]. \n Permban Это -- Перманентная блокировка [Блокировка даётся навсегда].`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
		if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		if(message.$match[1] == 1) return message.send(`🔸 Уважаемый @id${user.id}(Администратор), к сожалению @id543879044 (Разработчику) невозможно выдать временную блокировку.`);
		if(message.$match[1] == 2) return message.send(`🔸 Уважаемый @id${user.id}(Администратор), к сожалению @alexandvolk (Основателю) невозможно выдать временную блокировку.`);
		if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-PERMBAN!`);
		acc.users[message.$match[1]].ban = true
		acc.users[message.$match[1]].level = 0
		acc.users[message.$match[1]].rub = 0
		acc.users[message.$match[1]].donate = 0    
		user.ainfo.bans += 1;
		vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, выдал вам -- Перманентную блокировку [Блокировка навсегда].\n -- Комментарий Администратора: ${message.$match[2]}.\n -- [Система]: Снятие перманентной блокировки стоит 100₽ -- По поводу преобретения, писать @alexandvolk (Основателю).`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`@id${user.id}(${user.prefix}), Вы выдали игроку ${acc.users[message.$match[1]].prefix} перманентную блокировку [Блокировка навсегда].\n -- Причина блокировки: ${message.$match[2]}.`);
	    }); 


	    vk.updates.hear(/^(?:ban)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 2) return message.send(`⛔доступ закрыт⛔`);
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Уже заблокирован навсегда.`);
		if(acc.users[message.$match[1]].mute == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Уже имеет временную блокировку.\n -- Для разблокировки используйте команду: UnBan ${message.$match[1]}`);
		if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		if(message.$match[1] == 1) return message.send(`🔸 Уважаемый @id${user.id}(Администратор), к сожалению @id543879044 (Разработчику) невозможно выдать временную блокировку.`);
		if(message.$match[1] == 2) return message.send(`🔸 Уважаемый @id${user.id}(Администратор), к сожалению @alexandvolk (Основателю) невозможно выдать временную блокировку.`);
		if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-BAN!`);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 1440 || message.$match[2] < 1) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Ban [ID] [Время наказания (Минимально: 1 Минута - Максимально: 1440 Минут{24 часа})]. \n Ban Это -- Временная блокировка аккаунта [Блокировка даётся на время].`);
		let time = message.$match[2] * 60000;
		let id = Number(message.$match[1])
		acc.users[id].mute = true;

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		setTimeout(() => {
		acc.users[id].mute = false;
	    vk.api.call('messages.send', {
	    peer_id: acc.users[message.$match[1]].id,
		message: `[Система]: Срок временной блокировки истёк. \n -- С вашего Аккаунта быыла снята временная блокировка\n Удачной игры, не нарушайте больше.`
	    });
		}, time);

		vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, выдал вам -- Временную блокировку аккаунта на ${message.$match[2]} минут.\n\n -- Через [${message.$match[2]}] минут ваш аккаунт будет разблокирован.\n -- [Система]: Снятие досрочно, временной блокировки стоит 30₽ -- По поводу преобретения, писать @alexandvolk (Основателю).`
		});
		return message.send(`@id${user.id}(${user.prefix}), Вы выдали игроку ${acc.users[message.$match[1]].prefix} Блокировку на ${time/60000} минут.`); 
	    });



	    vk.updates.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				if(user.level < 2) return message.send(`⛔доступ закрыт⛔`);
						   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !message.$match[2]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так ??\n Подсказка: Пример команды: Warn [ID] [Причина предупреждения]. \n Warn Это -- Выдача предупреждение игроку [После выдачи 3х предупреждений, аккаунт игрока будет заблокирован].`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Уже заблокирован навсегда.`);
		if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(Администратор), к сожалению @id543879044 (Разработчику) невозможно выдать Предупреждение`);
		if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(Администратор), к сожалению @alexandvolk (Основателю) невозможно выдать Предупреждение`);
        		if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-WARN!`);
		acc.users[message.$match[1]].warn += 1;
		acc.users[message.$match[1]].warn_p.push(message.$match[2]);
		logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		let text = `Администратор: ${user.prefix}, выдал вам -- 1 Предупреждение.\n -- Комментарий Администратора: ${message.$match[2]}.\n\n После 3/3 Предупреждений ваш аккаунт будет заблокирован навсегда.\n -- [Система]: Снятие всех предупреждеий стоит 20₽ -- По поводу преобретения, писать @alexandvolk (Основателю).`
		if(acc.users[message.$match[1]].warn == 3){
			acc.users[message.$match[1]].ban = true;
			acc.users[message.$match[1]].warn_p = []
			acc.users[message.$match[1]].level = 0
		    acc.users[message.$match[1]].rub = 0
		    acc.users[message.$match[1]].donate = 0
			text += `\n🔸 @id${user.id}(${user.prefix}), Вы получили 3/3 Предупреждения.\n -- Ваш аккаунт был заблокирован навсегда.\n\n -- [Система]: Снятие перманентной блокировки стоит 100₽ -- По поводу преобретения, писать @alexandvolk (Основателю).`
     }
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		});
		user.ainfo.warns += 1;
		return message.send(`@id${user.id}(${user.prefix}), Вы выдали игроку ${acc.users[message.$match[1]].prefix} Предупреждение.\n -- Причина предупреждения: ${message.$match[2]} \n -- У игрока ${acc.users[message.$match[1]].warn}/3 предупреждений.`);
	});




	    vk.updates.hear(/^(?:AVIG)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.full == false) return message.send(`⛔доступ с данатом выше всех⛔`);
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !message.$match[2]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Avig [ID Администратора] [Причина Выговора]. \n Avig Это -- Выдача Административного выговора Администратору [После выдачи 3х выговоров, Администратор будет снят.].`);
	    if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Аккаунт игрока ${acc.users[message.$match[1]].prefix} заблокирован навсегда.`);
	    if(acc.users[message.$match[1]].level == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок ${acc.users[message.$match[1]].prefix} не Администратор`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(Основатель), к сожалению @id5438790449 (Разработчику) невозможно выдать выговор`);
		if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(Основатель), к сожалению @alexandvolk (Основателю) невозможно выдать выговор`);
        		if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-AVIG!`);
		acc.users[message.$match[1]].ainfo.vig += 1; 

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		let text = `Основатель ${user.prefix} выдал вам 1 Административный выговор.\n -- Комментарий Основателя: ${message.$match[2]}\n\n -- [Подсказка]: При 3/3 Аккаунт преобретает статус: Игрок. `
		if(acc.users[message.$match[1]].ainfo.vig == 3){  
			acc.users[message.$match[1]].level = 0;
			text += `\n🔸 @id${user.id}(${user.prefix}), Вы получили 3/3 Административных выговора..\n -- Ваш аккаунт преобрёл статус: Игрок.`
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`@id${user.id}(${user.prefix}), Вы выдали Административный выговор Администратору: ${acc.users[message.$match[1]].prefix}.\n Причина Выговора: ${message.$match[2]}\n -- У Него ${acc.users[message.$match[1]].ainfo.vig}/3 Выговоров. \n\n -- [Подсказка]: При 3/3 Аккаунт преобретает статус: Игрок. `);
	}); 


 
			    vk.updates.hear(/^(?:гбан)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(user.level < 4) return message.send(`⛔доступ закрыт⛔`);
	    let args = message.$match[1];
	    if(acc.users[message.$match[1]].level == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок ${acc.users[message.$match[1]].prefix} не Администратор`);
	    if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: гбан [ID] [Причина наказания]. `);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Администратора должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт Игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
		if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Администратор не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-PERMBAN!`);
        acc.users[message.$match[1]].block_give = true;     
		vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, Заблокировал вам возможность выдачи валюты [GIV].\n -- Комментарий Администратора: ${message.$match[2]}.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`@id${user.id}(${user.prefix}), Вы заблокировали Администратору ${acc.users[message.$match[1]].prefix} возможность выдачи валюты [GIV]\n -- Причина блокировки: ${message.$match[2]}.`);
	    });




			    vk.updates.hear(/^(?:рбан)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(user.level < 4) return message.send(`⛔доступ закрыт⛔`);
	    let args = message.$match[1];
	    if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: рбан [ID] [Причина наказания]. `);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} уже имеет перманентную блокировку\n Для разблокировки, используйте: UnPermBan ${message.$match[1]}.`);
		if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		if(acc.users[message.$match[1]].unban == true) return message.send(`У пользователя ${acc.users[message.$match[1]].prefix} стоит Анти-PERMBAN!`);
        acc.users[message.$match[1]].block_rep = true;    
		vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `Администратор: ${user.prefix}, Заблокировал вам возможность писать жалобы в репорт.\n -- Комментарий Администратора: ${message.$match[2]}.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`@id${user.id}(${user.prefix}), Вы заблокировали игроку ${acc.users[message.$match[1]].prefix} возможность писать в репорт\n -- Причина блокировки: ${message.$match[2]}.`);
	});
// Выдача наказаний:


// Досрочное снятие наказаний:

    vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 3) return message.send(`⛔доступ закрыт⛔`);
	if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} заблокирован навсегда!`);
	if(acc.users[message.$match[1]].mute == false) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Не имеет временную блокировку.`);
	if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnBan [ID Заблокированного пользователя] \n UnBan Это -- Команда для снятия временной блокировки. [Аккаунт пользователя будет досрочно разблокирован].`);
	if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
	var is = [user_id(message.user), message.text] 
	adm_log(is)
 	
	acc.users[message.$match[1]].mute = false;  
	vk.api.call('messages.send', {
	peer_id: acc.users[message.$match[1]].id,
	message: `[Система @iovelife (Бот volk)]: С вашего аккаунта досрочно была снята временная блокировка. \n -- Больше не нарушайте :)`
	});
	return message.send(`@id${user.id}(${user.prefix}), Вы Досрочно сняли временную блокировку игроку ${acc.users[message.$match[1]].prefix}`);	 
    });

	    vk.updates.hear(/^(?:unpermban)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				if(user.level < 3) return message.send(`⛔доступ закрыт⛔`);
		if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnpERMBan [ID Заблокированного пользователя] \n UnPermBan Это -- Команда для снятия перманентной блокировки. [Аккаунт пользователя будет разблокирован].`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == false) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Не заблокирован навсегда!`);
	    if(acc.users[message.$match[1]].mute == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} Не заблокирован навсегда.\n -- Но имеет временную блокировку.`);
		if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		acc.users[message.$match[1]].ban = false 
		vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @iovelife (Бот volk)]: С вашего аккаунта была снята перманентная блокировка.\n -- Больше не нарушай :)`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`@id${user.id}(${user.prefix}), Вы сняли игроку ${acc.users[message.$match[1]].prefix} перманентную блокировку.`);
	    });  

	vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				if(user.level < 3) return message.send(`⛔доступ закрыт⛔`);
		if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnWarn [ID пользователя c предупреждениями] \n UnWarn Это -- Команда для снятия всех предупреждений игроку. [Все предупреждения будут сняты с аккаунта игрока].`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Аккаунт игрока ${acc.users[message.$match[1]].prefix} заблокирован навсегда!`);
		if(acc.users[message.$match[1]].warn == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- У Игрока ${acc.users[message.$match[1]].prefix} 0/3 Предупреждений.`);
		if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);

		acc.users[message.$match[1]].warn = 0; 
		acc.users[message.$match[1]].warn_p = []

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `[Система @iovelife (Бот volk)]: С вашего аккаунта были сняты все предупреждения.\n -- Больше не нарушай :)`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`@id${user.id}(${user.prefix}), Вы сняли игроку ${acc.users[message.$match[1]].prefix} все предупреждения.`);
	}); 


	vk.updates.hear(/^(?:unavig)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				if(user.full == false) return message.send(`⛔доступ закрыт⛔`);
		if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: UnAvig [ID пользователя c выговорами] \n UnAvig Это -- Команда для снятия всех Административных выговоров Администратору. [Все выговоры будут сняты с аккаунта Администратора].`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
	    if(acc.users[message.$match[1]].ban == true) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Аккаунт игрока ${acc.users[message.$match[1]].prefix} заблокирован навсегда.`);
	    if(acc.users[message.$match[1]].level == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок ${acc.users[message.$match[1]].prefix} не Администратор`);
	    if(acc.users[message.$match[1]].ainfo.vig == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- У Игрока ${acc.users[message.$match[1]].prefix} 0/3 Административных выговоров.`);
		if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);

		acc.users[message.$match[1]].ainfo.vig = 0; 

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `[Система @iovelife (Бот volk)]: С вашего аккаунта были сняты все Административные выговора.\n -- Больше не нарушай :)`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`@id${user.id}(${user.prefix}), Вы сняли игроку ${acc.users[message.$match[1]].prefix} все Административные Выговора.`);
	}); 



	    vk.updates.hear(/^(?:ungban)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 4) return message.send(`⛔доступ закрыт⛔`);
		if(acc.users[message.$match[1]].level == 0) return message.send(`@id${user.id}(${user.prefix}), Что-то пошло не так 😱\n -- Игрок ${acc.users[message.$match[1]].prefix} не Администратор`);
		if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Ungban [ID Заблокированного Администратора]`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Администратора должен быть цифрового вида.`);
		if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Администратор не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
		acc.users[message.$match[1]].block_give = false 
		vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @iovelife (Бот volk)]: Вам была разблокированна возможность выдачи валюты. [giv]\n -- Больше не нарушайте :)`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`@id${user.id}(${user.prefix}), Вы разблокировали Администратору ${acc.users[message.$match[1]].prefix} возможность выдачи валюты [giv].`);
	    }); 




	    vk.updates.hear(/^(?:unrban)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 4) return message.send(`⛔доступ закрыт⛔`);
		if(!message.$match[1]) return message.send(` @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: Пример команды: Unrban [ID Заблокированного пользователя]`);
		if(!Number(message.$match[1])) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Подсказка: ID Пользователя должен быть цифрового вида.`);
		if(!acc.users[message.$match[1]]) return message.send(`🔸 @id${user.id}(${user.prefix}), Что-то пошло не так 😱\n Пользователь не обнаружен в Базе данных.\n Подсказка: Возможно вы не правельно ввели ID Пользователя. Пожалуйста, проверьте правильность введенных данных.`);
				acc.users[message.$match[1]].block_rep = false 
		vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `[Система @iovelife (Бот volk)]: Вам была разблокированна возможность писать жалобы в репорт.\n -- Больше не нарушайте :)`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`@id${user.id}(${user.prefix}), Вы разблокировали игроку ${acc.users[message.$match[1]].prefix} возможность писать в репорт.`);
	    });  


// Досрочное снятие наказаний:

//// Просморт наказуемых:
	vk.updates.hear(/^(?:banlist)/i, message => { 	
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"⛔ Заблокированные пользователи:"\n';
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.ban == 1) devs += `✳ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 1000) text += devs;
		return message.send(`${text}`);
	});
	vk.updates.hear(/^(?:nulllist)/i, message => { 	
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '"⛔ У этих пользователей баланс Null$"\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
 
			if (user.balance == null) devs += `✳ @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 100) text += devs;
		return message.send(`${text}`);
	});
//

/////////////////////////////////////////ШОК КОНТЕНТ////////////////////////////////
vk.updates.hear(/^(?:sex|секс|заняться сексом)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: SEX [ID] ❤ `);
		if(user.block_porn == true) return message.send(`Заниматся сексом можно раз в час`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
		if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id543879044 (Разработчике)!`);
		if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @alexandvolk (Основателе)!`);
		var is = [user_id(message.user), message.text] 
	    user.block_por = true;
		setTimeout(() => {
			user.block_porn = false;
	}, 3600000);
		let text = `❤ Игрок ${user.prefix} занялся с вами самым незабываемым Сексом ❤`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`❤ @id${user.id}(${user.prefix}), вы занялись Сексом с [${acc.users[message.$match[1]].prefix}]`);
	}); 

vk.updates.hear(/^(?:kuni|куни|сделать куни)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: KUNI [ID] ❤ `);
		if(user.block_porn == true) return message.send(`Делать куни можно раз в час`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
				if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id543879044 (Разработчике)!`);
				if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @alexandvolk (Основателе)!`);
		var is = [user_id(message.user), message.text] 
	    user.block_porn = true;
		setTimeout(() => {
			user.block_porn = false;
	}, 3600000);
		let text = `❤ ➾ Игрок ${user.prefix} сделал тебе самый незабываемый куни ❤`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`❤ @id${user.id}(${user.prefix}), вы сделали куни игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 

vk.updates.hear(/^(?:minet|минет|сделать минет)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: MINET [ID] ❤ `);
		if(user.block_porn == true) return message.send(`Делать минет можно раз в час`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
				if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id543879044 (Разработчике)!`);
				if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @alexandvolk (Основателе)!`);
		var is = [user_id(message.user), message.text] 
	    user.block_porn = true;
		setTimeout(() => {
			user.block_porn = false;
	}, 3600000);
		let text = `❤ ➾ ${user.prefix} сделала тебе самый незабываемый Минет ❤`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`❤ @id${user.id}(${user.prefix}), вы сделали минет игроку [${acc.users[message.$match[1]].prefix}]`);
	}); 

vk.updates.hear(/^(?:kiss|поцеловать)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: KISS [ID] ❤ `);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
				if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id543879044 (Разработчике)!`);
				if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @alexandvolk (Основателе)!`);
		var is = [user_id(message.user), message.text] 
	    user.block_porn = true;
		setTimeout(() => {
			user.block_porn = false;
	}, 3600000);
		let text = `❤ ➾ Игрок ${user.prefix} Поцеловал(а) тебя ❤`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(`❤ @id${user.id}(${user.prefix}), вы поцеловали [${acc.users[message.$match[1]].prefix}]`);
	}); 

vk.updates.hear(/^(?:iznas|изнасиловать)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
				   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`)
		if(!message.$match[1]) return message.send(`🔸 ➾ Пример команды: iznas [ID] ❤ `);
		if(user.bloks_poern == true) return message.send(`Насиловать можно раз в час`);
		if(!Number(message.$match[1])) return message.send(`🔸 ➾ ID Должен содержать только цифры`);
		if(user.level < 1) return message.send(`🔸 ➾ Вы не VIP-Пользователь`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Игрок не найден!`);
				if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @id543879044 (Разработчике)!`);
				if(message.$match[1] == 2) return message.send(`Уважаемый @id${user.id}(пользователь), к сожалению эту команду нельзя использовать на @alexandvolk (Основателе)!`);

		var is = [user_id(message.user), message.text] 
			    user.block_porn = true;
	    user.block_porn = true;
		setTimeout(() => {
			user.block_porn = false;
	}, 3600000);
		let text = `❤ Игрок ${user.prefix} изнасиловал вас.. 😨`
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		}); 
		return message.send(` ❤ @id${user.id}(${user.prefix}), вы изнасиловали [${acc.users[message.$match[1]].prefix}]`);
	}); 

//////////////////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:бот)$/i, (message) => {
		let dev = '';   
		let user = acc.users[user_id(message.user)];
		return message.send(`
			@id${user.id}(${user.prefix}), Информация о проекте:
			 📝 Проект: @iovelife (Бот volk)
			 😈 Основатель проекта: @alexandvolk (Алексанрдр Волк).

			 ⛔ АП: Разработчик бота/кода: @id543879044 (Алексанрдр).



            💻 Система:
            
             💻 » Зарегистрированно Аккаунтов: ${acc.number}
			 💻 » UpTime @iovelife (Бота volk): Дн: ${uptime.days} || Ч: ${uptime.hours} || Мин: ${uptime.min} || Сек: ${uptime.sec}
			 💻 » Cообщений: ${acc.msg}
             💻 » Версия системы: 0.2

            📚 Прочее: 
             ⛔ » Не забудьте вступить в группу: @iovelife (Боt volk)
             📢 » В ЛС группы работает бот - без задержек.
             Список наших бесед вы можете узнать, написав команду "Беседы"
			 message.send({attachment:photo-58dfcb506c43215b2a32323b})
			`);
	});
	vk.updates.hear(/^(?:беседы)$/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		return message.send(`
			@id${user.id}(${user.prefix}), Ссылки на наши беседы:\n [Официальная беседа]: https://vk.me/join/AJQ1dzuktw4bJqYLxav7Tnnv 
 
			`);
	});

vk.updates.hear(/^(?:баланс)/i,  (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.balance == null) return message.send(`⚠ Произошла ошибка! Пожалуйста, сообщите в репорт.`); 
	if(user.balance == NaN) return message.send(`⚠ Произошла ошибка! Пожалуйста, сообщите в репорт.`); 
	return message.send(`
	 @id${user.id}(${user.prefix}), на руках: ${spaces(user.balance)}$
	 💳 В банке: ${user.bank}
	 💳 Донат счёт: ${user.rub}₽`
		)

});


vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let warns = '';
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 Проверьте вводимые данные.`);
	for(i=0;i<acc.users[message.$match[1]].warn_p.length;i++){warns += `⛔ -- ${acc.users[message.$match[1]].warn_p[i]}\n`}
	if(user.level < 1) return; 
	let id = acc.users[message.$match[1]]
	return message.send(`
		Профиль:
	    🔎 ID: ${message.$match[1]}
	  `+(id.verify == false ? `✓ Верификация: не подтверждён\n` : `✓ Верификация: подтверждён\n`)+
	    (id.act == false ? `🔑 Аккаунт:  не Активирован\n` : `🔑 Аккаунт: Активирован\n`)+
		(id.lock == false ? `📗 Состояние профиля: Закрытый\n` : `📗 Состояние профиля: Открытый\n`)+
		(id.stat == false ? `🔎 Статус Профиля: не установлен\n` : `🔎 Персональный статус профиля: ${id.stat}\n`)+
		`👀 Ник (💙): ${id.prefix}
		📎 ID Профиля VK: ${id.id}
		📎 Профиль VK: @id${id.id}(Перейти)
		💰 Денег: ${id.balance}$
		💳 В банке: ${id.bank}
		💳 Донат счёт: ${id.rub}₽
		 `+(id.qiwi == false ? `💳 QIWI Кошелёк: Не привязан\n` : `💳 QIWI Кошелёк: +7${id.qiwi}\n`)+`
	    👑 Рейтинг: ${id.global_exs}
	    ❤ корон: ${id.donate}
        ♻ Уровень: ${id.lvl}
        🔑 Ключей для кейсов: ${id.keys} штук
        `+(id.brak == false ? `👫 Партнер: Не женат\n` : `👫 Партнер:   ${acc.users[id.brak].prefix}\n`)+
        `        `+(id.youtube == false ? `💻 YouTube Канал: Отсутствует\n` : `💻 YouTube Канал: ${id.youtube}\n`)+
	    `
        ?? Топ: Включен
        🔔 Уведомления: Включены
        📗 Дата регистрации: ${id.rtime}
     `(id.block_rep == false ? `🆘 Бан репорта: Нет\n` : `🆘 Бан репорта: Есть\n`)+
       `⏱ Последняя активность: ${id.msg.last_msg}
        📚 Сообщений боту: ${id.msg.messages}
        ⚠ Варнов: [${id.warn}/3] || Причины: [${id.warn}]\n${warns}

        ⛔ Доступ: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Основатель")}
        `+
       	(user.level >= 5 ? `⛔ ADMvig: [${id.ainfo.vig}/3]\n` : ``)+
		(id.ban == false ? `⚠ Аккаунт не заблокирован\n` : `⛔ ЗАБЛОКИРОВАН [${id.ban}] -- Навсегда`)
		);
	});

vk.updates.hear(/^(?:вабанк)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.balance < 1) return message.send(`@id${user.id}(${user.prefix}), у тебя нет денег!`);
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += user.balance;
		return message.send(`@id${user.id}(${user.prefix}), вы выиграли!\n Ваш баланс -- ${spaces(user.balance)}$`);
	}else{ 
		let count = [0].random();
		user.balance = count;
		return message.send(`@id${user.id}(${user.prefix}), вы проиграли все свои деньги!`);
	}
});
 
	  vk.updates.hear(/^(?:Купить VIP|купить вип|buy вип|buy vip)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.rub < 110) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Денег -- У вас ${user.rub}₽\n -- Стоймость Уровня доступа: VIP -- 110₽\nПополнить счет можно тут: https://qiwi.me/bot_volk\n После перевода скинуть скрин-шот покупки @alexandvolk(Основателю)!\n Он выдаст вам 110₽`);
	user.rub -= 110;
	user.level = 1;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы купили VIP-Аккаунт.\n-- На ваш Аккаунт успешно установлен уровень доступа: VIP\nПомощь -- "ahelp"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы купили VIP-Аккаунт.\n-- На ваш Аккаунт успешно установлен уровень доступа: VIP\nПомощь -- "ahelp"`);
	}
});

	  vk.updates.hear(/^(?:Купить Modera|купить Модератора|Купить Mod|buy Модератора|buy ModerA)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.rub < 250) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Денег -- У вас ${user.rub}₽\n -- Стоймость Уровня доступа: Модератор -- 250₽\nПополнить счет можно тут: https://qiwi.me/bot_volk\n После перевода скинуть скрин-шот покупки @alexandvolk(Основателю)!\n Он выдаст вам 250₽`);
	user.rub -= 250;
	user.level = 2;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Модератор\n-- На ваш Аккаунт успешно установлен уровень доступа: Модератор\nПомощь -- "ahelp"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Модератор\n-- На ваш Аккаунт успешно установлен уровень доступа: Модератор\nПомощь -- "ahelp"`);
	}
});

	  vk.updates.hear(/^(?:Купить Admin|купить Админку|Купить Adm|buy Админку|buy Admin)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.rub < 470) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Денег -- У вас ${user.rub}₽\n -- Стоймость Уровня доступа: Администратор -- 470₽\nПополнить счет можно тут: https://qiwi.me/bot_volk\n После перевода скинуть скрин-шот покупки @alexandvolk(Основателю)!\n Он выдаст вам 470₽`);
	user.rub -= 470;
	user.level = 3;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Администратор\n-- На ваш Аккаунт успешно установлен уровень доступа: Администратор\nПомощь -- "ahelp"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Администратор\n-- На ваш Аккаунт успешно установлен уровень доступа: Администратор\nПомощь -- "ahelp"`);
	}
});

	  vk.updates.hear(/^(?:Купить GLADM|купить ГлАдм|Купить GA|buy ГлАдмин|buy GLADM)/i, (message) => {   
	let user = acc.users[user_id(message.user)];
	if(user.rub < 690) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает Денег -- У вас ${user.rub}₽\n -- Стоймость Уровня доступа: Главный Администратор -- 690₽\nПополнить счет можно тут: https://qiwi.me/bot_volk\n После перевода скинуть скрин-шот покупки @alexandvolk(Основателю)!\n Он выдаст вам 690₽`);
	user.rub -= 690;
	user.level = 4;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Гланый Администратор\n-- На ваш Аккаунт успешно установлен уровень доступа: Главный Администратор\nПомощь -- "ahelp"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы купили Доступ: Главный Администратор\n-- На ваш Аккаунт успешно установлен уровень доступа: Главный Администратор\nПомощь -- "ahelp"`);
	}
});


	vk.updates.hear(/^(?:buykey)/i, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.donate < 100) return message.send(`@id${user.id}(${user.prefix}), у вас не хватает корон❤ -- [у вас ${user.donate} корон << ❤]\n -- Стоймость Ключа 100 корон = 50₽\n🔑 Ключей от кейсов: ${user.keys}\nПополнить счет можно тут: [https://qiwi.me/bot_volk]\n После пополнения скинуть скрин-шот покупки @alexandvolk(Основателю)!`);
	user.donate -= 100;
	user.keys += 1;
	let rez = [true, false].random(); 
	if(rez == false){
		let text = [].random(); 
		user.balance += 0;
		return message.send(`@id${user.id}(${user.prefix}), вы успешно преобрели 1 ключ на открытие кейса.\n Баланс ключей: ${user.keys} 🔑\n-- Что бы открыть кейс введи: "kopen"`);
	}else{ 
		let count = [0].random();
		user.balance += count;
		return message.send(`@id${user.id}(${user.prefix}), вы успешно преобрели 1 ключ на открытие кейса.\n Баланс ключей: ${user.keys} 🔑\n-- Что бы открыть кейс введи: "kopen"`);
	}
});

vk.updates.hear(/^(?:Брак)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]
			   let args = message.$match[1];
	if(args == user_id(message.user)) return message.send(`@id${user.id}(${user.prefix}), Вы указали свой ID`) 
	if(user.brak != false) return message.send(`@id${user.id}(${user.prefix}), а я н поняд,кто это нам изменяет ?  жена,ля ты слышала ${acc.users[message.$match[1]].prefix} ?.`);
	if(!acc.users[message.$match[1]]) return message.send(`@id${user.id}(${user.prefix}), такого игрока нет.`);
	if(acc.users[message.$match[1]].brak != false) return message.send(`Этот пользователь уже женат(а)`);
	user.brak = Number(message.$match[1]);
	acc.users[message.$match[1]].brak = user_id(message.user);
	return message.send(`❤❤❤\n👫 Поздравим молодоженов: @id${user.id}(${user.prefix}) и ${acc.users[message.$match[1]].prefix}\n❤❤❤`)
});

vk.updates.hear(/^(?:развод)/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.brak == false) return message.send(`@id${user.id}(${user.prefix}), вы не женаты.`); 
	acc.users[user.brak].brak = false;
	user.brak = false;
	return message.send(`👫 @id${user.id}(${user.prefix}), вы успешно развелись.`)
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
vk.updates.hear(/^(?:игропрофиль)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		@id${user.id}(${user.prefix}), ваш Игро-Профиль « 📕
		🔸 ID: ${user_id(message.user)}
		🔸 Баланс: ${spaces(user.balance)}$
		💳 Донат счёт: ${user.rub}₽
		🔑 Ключей от кейсов: ${user.keys}
	
		🎲 Игры « 🎲	 
		🎰 Казино: [Побед: ${user.game.kazwin}/ Поражений: ${user.game.kazlose}]
		`);

});


vk.updates.hear(/^(?:key)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		🔑 Ключей от кейсов: ${user.keys}
		`);

});

 

vk.updates.hear(/^(?:профиль|проф)\s?([0-9]+)?/i, (message) => { 
    let cars = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
	
	let user = acc.users[user_id(message.user)];
	if(user.balance == null) return message.send(`⚠ Произошла ошибка! Пожалуйста, сообщите в репорт.`);
	if(user.balance == NaN) return message.send(`⚠ Произошла ошибка! Пожалуйста, сообщите в репорт.`);
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
	let id = user_id(message.user)
	let warns = '';
	for(i=0;i<user.warn_p.length;i++){warns += `⛔ ${user.warn_p[i]}\n`}

	if(!message.$match[1]){
		return message.send(`
		@id${user.id}(${user.prefix}), твой профиль:
		🔎 ID: ${user_id(message.user)}
	  `+(user.verify == false ? `⛔ Верификация: не подтверждён\n` : `✓ Верификация: подтверждён\n`)+
		(user.act == false ? `🔑 Аккаунт:  не Активирован\n` : `🔑 Аккаунт: Активирован\n`)+
		(user.lock == false ? `📗 Состояние профиля: Закрытый\n` : `📗 Состояние профиля: Открытый\n`)+
		(user.stat == false ? `🔎 Статус Профиля: не установлен\n` : `🔎 Персональный статус профиля: ${user.stat}\n`)+`
		💰 Денег: ${spaces(user.balance)}$
		💰 Денег в банке: ${spaces(user.bank)}$
		❤ корон: ${spaces(user.donate)}
		👑 Рейтинг: ${spaces(user.global_exs)}
		💳 Донат счёт: ${user.rub}₽
		♻ Уровень: ${user.lvl} [${user.exs}🌟/${user.exsup}🌟]
		` +
		(user.brak == false ? `👫 Партнер: Не женат\n` : `👫 Партнер:   ${acc.users[user.brak].prefix}\n`)+`
   
		🔑 Имущество:\n` +
		(user.pit== false ? `🐼 Питомец:  Отсутствует\n` : `🐼 Питомец:  ${user.pit}\n`)+   
		(user.cars == false ? `🚗 Машина: Отсутствует\n` : `🚗 Машина: ${cars[user.cars]}\n`)+  
		    `
		⛔ Ваш уровень доступа: ${user.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP-Пользователь").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Основатель")}

		📗 Дата регистрации: ${user.rtime} 
		`);
	}else{
		if(!Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 ➾ Проверьте вводимые данные.`);
		if(!acc.users[message.$match[1]].act == true) return message.send(`Аккаунт пользователя не Активирован!`);
	    if(!acc.users[message.$match[1]].lock == true) return message.send(`Аккаунт пользователя Закрыт!`);
		let id = acc.users[message.$match[1]]
		return message.send(`
			📋 Информация об игроке [${id.prefix}] 📋
			🔎 ID: ${message.$match[1]}
		   `+(id.verify == false ? `⛔ Верификация: не подтверждён\n` : `✓ Подтверждёный Профиль.\n
        Эта отметка означает, что профиль ${id.prefix} подтвержден администрацией @iovelife (Бот volk).\n\n`)+

            (id.act == false ? `🔑 Аккаунт:  не Активирован\n` : `🔑 Аккаунт: Активирован\n`)+
		    (id.stat == false ? `🔎 Статус Профиля: не установлен\n` : `🔎 Статус Профиля: ${id.stat}\n`)+`
			💰 Денег: ${spaces(id.balance)}$
			👑 корон: ${spaces(id.donate)}
			👑 Рейтинг: ${spaces(id.global_exs)}
			💳 Донат счёт: ${id.rub}₽
			` +
			(id.brak == false ? `👫 Партнер: Не женат\n` : `👫 Партнер:   ${acc.users[id.brak].prefix}\n`)+
			`
			🔑 Карманы: `+(id.gun_name == false ? `Пусто\n` : `Есть ствол | Название: ${id.gun_name}\n`)+  
		    ` 
			⛔ Доступ: ${id.level.toString().replace(/0/gi, "Пользователь").replace(/1/gi, "VIP-Пользователь").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Основатель")}

            📗 Дата регистрации: ${id.rtime} 
			`);
		}
	 
});


 
//////////////////////////////////////////
	vk.updates.hear(/^(?:топ)/i,  (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].global_exs
			})

		} 
			 
		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "Топ игроков: \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^(?:казино)\s?([^\s  ].*)?/i, (message) => {
        if(!message.$match[1]) return message.send(`Ставка должна быть минимум 1$`);
        let amount = Number(parserInt(message.$match[1]));
        amount = Math.round(amount);   
        let user = acc.users[user_id(message.user)]; 
        if(!Number(amount)) return message.send(`🔸 ➟ Ставка должна быть минимум 1$`);
        if (amount > user.balance || amount < 1 ) return message.send(`🎉 ➟  Ставка должна быть минимум 1$`);
        let mnojitel = [1,2,3,4,5].random();
        let win = ['1|1|1','7|7|7','6|6|6'].random();
        let lose = ['5|1|0','2|4|9','3|8|1'].random();

        if(rand(1,100) < 30){
        	let balance = amount;
        	let win_balance = amount * mnojitel;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance) 
        	return message.send(`@id${user.id}(${user.prefix}), вам выпала комбинация: [${win}]\n\n❤ Вы выиграли ${win_balance}$ (х${mnojitel})\n💰 Баланс: ${spaces(user.balance)}$`); 
        }else{
        	user.balance -= amount;
        	return message.send(`@id${user.id}(${user.prefix}), вам выпала комбинация: [${lose}]\n\n🌚 Вы проиграли ${amount}$\n💰 Баланс: ${spaces(user.balance)}$`); 
        }
    });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
	vk.updates.hear(/^(?:log)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return;

		if(!message.$match[2]) return message.send(`Уважаемый @id${user.id} (Основатель), вы попали в систему [ADMIN LOG]\n Для того что бы её использовать введите: LOG [ID] [Номер зрапроса] - -\n1. Передачи [передать (ID)]\n2. Выдачи [giv (ID)]\n3. Обнуления баланса [remmon (ID)]\n4. Выдача прав [setadmin (ID)]\n5. Обнуление прав [Delladmin (ID)]\n6. Варны [warn (ID)]`) 
		let id = message.$match[1];
		let i = message.$match[2];
		if(i < 0 || i > 5) return message.send(`Ошибка, Доступ закрыт.`);
		let text = '';
		if(i == 1) for(i=0; i!=log.point[id].log.length; i++){text += log.point[id].log[i];}
		if(i == 2) for(i=0; i!=log.give[id].log.length; i++){text += log.give[id].log[i];}
		if(i == 3) for(i=0; i!=log.remove[id].log.length; i++){text += log.remove[id].log[i];} 
		if(i == 4) for(i=0; i!=log.admin[id].log.length; i++){text += log.admin[id].log[i];} 
		if(i == 5) for(i=0; i!=log.setwin[id].log.length; i++){text += log.setwin[id].log[i];}  
		if(i == 6) for(i=0; i!=log.warns[id].log.length; i++){text += log.warns[id].log[i];}  
		return message.send(text);
	});

	vk.updates.hear(/^(?:лог)/i, (message) => {
		let id = user_id(message.user);
		 
		let text = '⛔ Лог последних 15 игр ⛔\n';
		for(i=0; i!=log.game[id].log.length; i++){text += log.game[id].log[i];} 
		return message.send(text);
	});
 //Донат
 	vk.updates.hear(/^(?:донат)/i,  message => {
		let user = acc.users[user_id(message.user)];
 		return message.send(`	
 			💳Донат услуги проекта @iovelife (Бот volk)💳

 			❤ >> корон ${user.rub}
 			💳 >> Донат счёт: ${user.rub}₽
 			🔑 >> Ключей от кейсов: ${user.keys}



			👑 >> Покупка корон: 2 за 1₽.


 			⚠[Доступ]⚠
 			🔹 >> VIP[1]
 			🔻 Срок: Навсегда >> 110₽. -- Для покупки: [Купить VIP] https://qiwi.me/bot_volk (указать в комментариях ссылку на страницу вк)

 			🔹 >> Уровень доступа: Модератор[2]
         	🔻 Срок: Навсегда >> 250₽. -- Для покупки: [Купить Mod] https://qiwi.me/bot_volk (указать в комментариях ссылку на страницу вк)

 			🔹 >> Уровень доступа: Администратор[3]
            🔻 Срок: Навсегда >> 390₽. -- Для покупки: [Купить Admin] https://qiwi.me/bot_volk (указать в комментариях ссылку на страницу вк)

 			🔹 >> Уровень Доступа: Главный Администратор[4]
 			🔻 Срок: Навсегда >> 440₽. -- Для покупки: [Купить GLADM] https://qiwi.me/bot_volk (указать в комментариях ссылку на страницу вк)

 			🔹 >> Уровень Доступа: Основатель[5]
 			🔻 Срок: Навсегда >> 550₽. -- Покупка у @alexandvolk (Основателя) или по ссылке https://qiwi.me/bot_volk (указать в комментариях ссылку на страницу вк)

 			 🔹 >> Уровень Доступа: Full-Dostup
 			🔻 Срок: Навсегда >> 1000₽.  -- Покупка у @alexandvolk (Основателя) или по ссылке https://qiwi.me/bot_volk (указать в комментариях ссылку на страницу вк)

            [Валюта]
            💵 >> 100.000$ - 10 ₽.
 			💵 >> 600.000$ - 50 ₽.
 			💵 >> 1.500.000$ - 100 ₽.


            [Прочее]
 			🔸 >> Снять 'Временную Блокировку' >> 30 рублей.
 			🔸 >> Разбан аккаунта >> 100 рублей.	


            [Кейсы]
            📋 > Информация по преобретению кейсов:
            📋 > Команда: "Кейс"

            [Преобретать строго у разработчика]
 			💴 >> Приобрести: @alexandvolk (volk)
 			`)
 	});

 //////////// full dostup - - - - - - 

	vk.updates.hear(/^(?:timevip)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
        if(user.full == false) return message.send(`⛔доступ закрыт⛔`);
		let id = user_id(message.user);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ timeevip [ID] [Время(1-999)](дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 1;
		return message.send(`💰 ➾ Вы выдали VIP Профиль игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});



	vk.updates.hear(/^(?:timemoder)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
        if(user.full == false) return message.send(`⛔доступ закрыт⛔`);
		let id = user_id(message.user);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ timemoder [ID] [Время(1-999)](дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 2;
		return message.send(`💰 ➾ Вы выдали Уровень доступа: Модератор игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});

	vk.updates.hear(/^(?:timeadm)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		let id = user_id(message.user);
        if(user.full == false) return message.send(`⛔доступ только основателю,его можно купить⛔`);
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ ➾ Проверьте вводимые данные:\n⏺ ➾ timeadm [ID] [Время(1-999)](дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 3;
		return message.send(`💰 ➾ Вы выдали Уровень дотупа: Администратор игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] на ${message.$match[2]} дней.`); 
	});






	vk.updates.hear(/^(?:setadmin|makeadmin)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		  let id = user_id(message.user);	 	 
		  let i = config;	 
		    if(acc.users[id].level < 5) return; message.send(`⛔доступ закрыт⛔`);

			let user = acc.users[user_id(message.user)]; 
			if(user.level < 5) return message.send(`⛔доступ закрыт⛔`);
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: setadmin [ID] [Уровень доступа: (1-5)]`); 
			if(message.$match[2] > 5) return message.send(`🔸 >> Максимальный уровень доступа [5]`)
			if(!acc.users[message.$match[1]]) return message.send(`❎ ➾ Такого игрока нет!`);
			if(message.$match[1] == 1) return message.send(`Уважаемый @id${user.id}(Администратор), к сожалению @id543879044 (Разработчику) невозможно Редактировать уровень доступа!`);
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `✅ Основатель: ${user.prefix} выдал Вам должность: ${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP`a").replace(/2/gi, "Модератора").replace(/3/gi, "Администратора").replace(/4/gi, "Главного Администратора").replace(/5/gi, "Создателя")}.\n Для того что бы узнать свои команды пиши: "ahelp"\n -- Команда работает только тут!`
			});
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`🔸 >> Вы выдали игроку[${acc.users[message.$match[1]].prefix}]\n🔸 >> Доступ: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Создатель")}]`);
		 
	});



	vk.updates.hear(/^(?:full)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => { 	 
		  let i = config;	 
		    if(message.user !== 543879044 && message.user !== 386538131) return message.send(`⛔доступ закрыт⛔`);

			let user = acc.users[user_id(message.user)]; 
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 >> Пример команды: Full [ID] [Уровень доступа: (1-5)] - Фулл Доступ: Позволяет управлять Администрацией не имея должности "Создатель"`); 
			if(message.$match[2] > 5) return message.send(`🔸 >> @id${message.user} (${user.prefix}), Максимальный уровень доступа: 5`)
			if(!acc.users[message.$match[1]]) return message.send(`@id${message.user} (${user.prefix}), Такого игрока нет!`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `✅ @id${message.user} (${user.prefix}), выдал  вам должность: ${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP`a").replace(/2/gi, "Модератора").replace(/3/gi, "Администратора").replace(/4/gi, "Главного Администратора").replace(/5/gi, "Создателя")}.\n Для того что бы узнать свои команды пиши: "ahelp"\n -- Команда работает только тут!`
			});
			var is = [user_id(message.user), message.text]
			return message.send(`🔸 >> [FULL-DOSTUP] @id${message.user} (${user.prefix}) -- Вы выдали игроку [${acc.users[message.$match[1]].prefix}] >> Уровень Доступа: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Создатель")}]`);
		});



 vk.updates.hear(/^(?:питомцы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
 			🐼 Питомцы 🐼

			🐌1. Улитка.
			🐋2. Кит.
			🐑3. Овца.
			🐔4. Курица.
			🐨5. Коала.
			🐝6. Оса.
			🐷7. Свинья.
			🐘8. Слон.
			🐵9. Мартышка.
			🐧10. Пингвин.
			🐅11. Тигр.
			🐶12. Волк.
			🐰13. Заяц.
			🐄14. Корова.

			💵 ➾ Цена питомца: 5000$

			Для покупки введите "Питомцы [номер]"
			Для продажи введите "Продать питомца"
			[Деньги не возвращаются]
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
 	let names = [0,'Улитка','Кит','Овца','Курица','Коала','Оса','Свинья','Слон','Мартышка','Пингвин','Тигр','Волк','Заяц','Корова']
 	if(i < 0 || i > 14) return;
 	if(user.pit != false) return message.send(`🐼 ➾ У вас уже куплен питомец`);
 	if(i > 0 && i <= 14){
 		if(user.balance < 5000) return message.send(`🐼 ➾ У вас не достаточно $.`);
 		user.balance -= 5000;
 		user.pit = names[i];
 		return message.send(`🐼 ➾ Вы купили питомца (${names[i]}) за 5000$`)
 	}
 	 
 });

 	  vk.updates.hear(/^(?:Продать питомца)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.pit == false) return message.send(`У вас нет питомца`);
 	user.pit = false;
 	return message.send(`🐼 ➾ Вы отдали ${names[i]} в приют`);
 });
 ///////////////////////////////////////////////////////

	vk.updates.hear(/^(?:сократи)\s?([^]+)?/i,  message => {

		   let cc = message.$match[1].toLowerCase();
	 
	       let text = message.$match[1];
	       if(!text) return message.send("⚠ Введите ссылку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ Введите ссылку, которую нужно сократить!");
	        message.send("😜 ➾ Короткая ссылка: " + res.short_url);
	     });
	  
	   });



///////////////////////////////////////////////////////////////////////////////

        vk.updates.hear(/^(?:сейф)/i, (message) => { 
 		let user = acc.users[user_id(message.user)];	
		 if(user.balance < 2000) return message.send(`🔑 @id${user.id}(${user.prefix}), На вашем баланс должно быть не менее 2000$`);
		if (user.safe_status != false) return message.send(`🔑 @id${user.id}(${user.prefix}), Взломать сейф можно раз в 10 минут.`);
		 
		if (user.safe_status == 3) return message.send(`⛔у тебя маленький статус⛔`);
		user.safe_status = 3;
		user.safe_key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(` 
@id${user.id}(${user.prefix}), Вы начали взлом банка 🏛
❓ P.S Глава банка слишком туп, по этому всегда ставит код из 4х цифр..
🔑 Ваша задача: подобрать код из 4 одинаковых цифр.
🗝 Начать взлом: "Взлом [код]" Удачи!
		 
  `);
	});
	vk.updates.hear(/^(?:взлом)\s?([0-9]+)?$/i, message => {
 		let user = acc.users[user_id(message.user)];
		 if(user.balance < 2000) return message.send(`🔑 @id${user.id}(${user.prefix}), На вашем баланс должно быть не менее 50.000$`);
		if (user.safe_status == true) return message.send(`🔑 @id${user.id}(${user.prefix}), Взломать сейф можно раз в 10 минут.`);
		if (user.safe_status == false) return;
		if (!message.$match[1]) return message.send(`🗝 @id${user.id}(${user.prefix}), Укажите код к сейфу.`);
		if (message.$match[1] > 9999) return message.send(`🗝 @id${user.id}(${user.prefix}), Код - состоит из 4 одинаковых символов.`);
		if (message.$match[1] < 0) return message.send(`🗝 @id${user.id}(${user.prefix}), Код - состоит из 4 одинаковых символов.`);
		let nu = user.safe_key;
		let kod = Number(message.$match[1]);
		if (kod == user.safe_key) { 
			let summ = rand(50000,200);
			user.balance += summ; 
			user.safe_key = false; 
			user.safe_status = true;
			setTimeout(() => {
			user.safe_status = false;
			}, 600000);
			message.send(`@id${user.id}(${user.prefix}), невероятно! Вы смогли угадать код\n🏛 Обыскивая сейф вы нашли:\n💴 ${spaces(summ)}$ you winnn!`)
			return message.send({sticker_id: 3376});
		} else {
			let vzlom = rand(5000,8000);
			user.balance -= vzlom; 
			user.safe_status = true;
			user.safe_key = true;
			setTimeout(() => {
			user.safe_status = false;
			}, 600000); 
			message.send(`
@id${user.id}(${user.prefix}), к сожалению вы не угадали код!
🤠 Вас задержали на 10 минут и оштрафовали на ${spaces(vzlom)}$.
🔑 Код от сейфа был: ${nu}
❓ Глава банка успешно сменила код на 4 одинакоых цифры..
— Следующая попытка взлома доступна через 10 минут!

`)
			return message.send({sticker_id: 4340});
			
		}
	});

  
 vk.updates.hear(/^(?:лотерея)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 5000) return message.send(`💣 @id${user.id}(${user.prefix}), Лотерейный билетик стоит 5000$`);
	user.balance -= 5000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 500;
		return message.send(`💣 @id${user.id}(${user.prefix}), Вам попалась неудачный билет.\n👒 ➾ Вы выиграли 500$`);
	}else{ 
		let count = [3000,5000,10000,15000,20000].random();
		user.balance += count;
		return message.send(`🎉 @id${user.id}(${user.prefix}), Удачный билетик!\n👒 ➾ Вы получили ${count}$`);
	}
});
   
  ////////////////


vk.updates.hear(/^(?:создать клан)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	if(user.donate < 50) return message.send(`📘 ➾ Создание клана стоит 50 корон❤`);
	if(!message.$match[1]) return message.send(`📘 ➾ Напишите название для клана.`);
	if(acc.users[id].frac_name != false) return message.send(`📘 ➾ Вы уже находитесь в клане`);
	let args =  message.$match[1];
	if(frac[args]) return message.send(`📘 ➾ клан с таким названием уже существует.`);
	frac[args] = {
		users: {},
		balance: 0,
		bank: 0,
		people: 1, 
		counts: 0,
		owner: message.user
	}
	frac[args].users[id] = {
		count: 0
	}
	user.frac_name = args;
	return message.send(`
		📘 ➾ Вы создали клан "${args}"
		📘 ➾ Информация: "инф.кланы"
		`);
}); 

vk.updates.hear(/^(?:кланы)/i,  (message) => { 
	let text = '📘 ➾ Список кланов:\n\n'
	for(i in frac){
 		text += `💼 ➾ Название: ${i} | Владелец: @id${frac[i].owner}(${acc.users[user_id(frac[i].owner)].prefix})\n`
	}
	return message.send(`
	${text}
	`);
});

vk.updates.hear(/^(?:войти)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)]; 
	if(frac[message.$match[1]].owner == message.user) return message.send(`📘 ➾ Вы итак создатель клана!`); 
	if(!message.$match[1]) return message.send(`📘 ➾ Напишите точное название клана, где хотите работать. (Учитывая регистр/знаки/символы/смайлы)`);
	if(acc.users[id].frac_name != false) return message.send(`📘 ➾ Вы уже находитесь в кланы`);
	let args = message.$match[1];
	if(!frac[args]) return message.send(`📘 ➾ клана с таким названием не существует.`);
	if(frac[args].people >= 10) return message.send(`📘 ➾ Максимальное кол-во работников в клане 10.`)
	frac[args].people += 1;
	frac[args].users[id] = {
		count: 0
	}
	user.frac_name = args;
	return message.send(`
		📘 ➾ Вы вступили в клан "${args}"
		📘 ➾ Информация: "инф.кланы"
		`);
}); 

vk.updates.hear(/^(?:выйти)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`📘 ➾ Вы не находитесь в клане`);      
	let name = acc.users[id].frac_name;
	if(frac[name].owner == message.user) return message.send(`📘 ➾ Создатель клана не может её покинуть!`); 

	frac[name].people -= 1;
	delete frac[name].users[id];

	user.frac_name = false;
	return message.send(`
		📘 ➾ Вы покинули клан "${name}" 
		`);
});

vk.updates.hear(/^(?:кланы снять)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`📘 ➾ Вы не находитесь в клане`);      
	let name = acc.users[id].frac_name;
	if(frac[name].owner != message.user) return message.send(`📘 ➾ Команда доступна создателю клана!`); 
	let sum = frac[name].balance;
	frac[name].balance = 0;
	user.balance += Number(sum);
	return message.send(`
		💴 ➾ Вы сняли с баланса клана ${sum}$
		`);
});

vk.updates.hear(/^(?:инф.кланы)$/i, (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	
	if(acc.users[id].frac_name == false){
		return message.send(`
		💼 ➾ Информация о клане:

		🔸 ➾ Вступить в клан: 'Войти <название клана>'
		🔸 ➾ Покинуть клан: 'Выйти'
		🔸 ➾ клан снять - снять все деньги(для создателя)

		`);
	}
	let text = '';
	for(i in frac[user.frac_name].users){
		text += `🔻 ➾ @id${acc.users[i].id}(${acc.users[i].prefix}) | [${frac[user.frac_name].users[i].count}] раз за 2 часа\n`
	}
		 return message.send(`
		📘 ➾ Название клан "${user.frac_name}"
		📑 ➾ Работников: ${frac[user.frac_name].people}
		💴 ➾ В копилке: ${frac[user.frac_name].bank}$
		💰 ➾ На счету: ${frac[user.frac_name].balance}$

		👑 ➾ Создатель: @id${frac[user.frac_name].owner}(${acc.users[user_id(frac[user.frac_name].owner)].prefix})

		💼 ➾ Информация о клане:
		 🔸 ➾ Чтобы фракция приносила прибыль, нужны рабочие.
		🔸 ➾ Рабочие добровольно могут устроиться во фракцию.
		🔸 ➾ Для устройства им нужно прописать: 'Войти <название фракции>'
		🔸 ➾ Максимальное количество рабочих - 10.
		🔸 ➾ Каждые 10 минут рабочие должны писать команду 'Отработать'.
		🔸 ➾ За каждое написание в копилку фракции идет 5000$.
		🔸 ➾ Каждые 2 часа сумма из копилки переходит на счет фракции и делится автоматически между создателем фракции(10% от прибыли) и работниками(90% от прибыли).
		
		`);
}); 

async function run() {
    await vk.updates.startPolling();
    console.log('[Система]: volk, бот успешно активирован!');
	restart();
}

run().catch(console.error);

 vk.updates.hear(/^(?:Рестарт|restart)$/i, (message) => {
 let user = acc.users[user_id(message.user)];
 if(user.full == false) return message.send(`<⛔доступ закрыт⛔>`);
    vk.updates.startPolling();
	process.exit(-1);
	restart();

});


function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
var parserInt1 = (str) => parseInt(str.replace(/м|m/ig, "000000"));	
function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
}

 //------------------------------------------------------------------------------------\\ 
 //------------------------------------------------------------------------------------\\
 	function user_id(id) {
	 	let ids = 0
	 	if(uid[id]){
	 		ids = uid[id].id
	 	}    
		return ids; 
	}  
  //------------------------------------------------------------------------------------\\
//------------------------------------------------------------------------------------\\
	// log
 	function logs(id, ids, num, type) {
	 	
 	// - - - - - - - - - - - - - - - - -  
  		if(type == 1){ 
 			if(!log.point[ids]){ log.point[ids] = { log: [] }  } 
 			if(!log.point[id]){ log.point[id] = { log: [] }  } 
 			log.point[id].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.point[ids].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.point[id].log.length >= 15){ delete log.point[id].log.shift() } 
			if(log.point[ids].log.length >= 15){ delete log.point[id].log.shift() } 
 		}
 		if(type == 2){ 
 			if(!log.give[ids]){ log.give[ids] = { log: [] }  } 
 			if(!log.give[id]){ log.give[id] = { log: [] }  } 
 			log.give[id].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.give[ids].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.give[id].log.length >= 15){ delete log.give[id].log.shift() } 
			if(log.give[ids].log.length >= 15){ delete log.give[id].log.shift() }  
 		}
 		if(type == 3){ 
 			if(!log.remove[ids]){ log.remove[ids] = { log: [] }  } 
 			if(!log.remove[id]){ log.remove[id] = { log: [] }  } 
 			log.remove[id].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
 			log.remove[ids].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
			if(log.remove[id].log.length >= 15){ delete log.remove[id].log.shift() } 
			if(log.remove[ids].log.length >= 15){ delete log.remove[id].log.shift() } 
 		} 
 		if(type == 4){ 
 			if(!log.admin[ids]){ log.admin[ids] = { log: [] }  } 
 			if(!log.admin[id]){ log.admin[id] = { log: [] }  } 
 			log.admin[id].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
 			log.admin[ids].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
			if(log.admin[id].log.length >= 15){ delete log.admin[id].log.shift() } 
			if(log.admin[ids].log.length >= 15){ delete log.admin[id].log.shift() } 
 		} 
 		if(type == 5){ 
 			if(!log.setwin[ids]){ log.setwin[ids] = { log: [] }  } 
 			if(!log.setwin[id]){ log.setwin[id] = { log: [] }  } 
 			log.setwin[id].log.push(`[${time()} | ${data()} | Setwin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}%\n`)
 			log.setwin[ids].log.push(`[${time()} | ${data()} | Setwin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}%\n`)
			if(log.setwin[id].log.length >= 15){ delete log.setwin[id].log.shift() } 
			if(log.setwin[ids].log.length >= 15){ delete log.setwin[id].log.shift() }  
 		} 
 		if(type == 6){ 
 			if(!log.warns[ids]){ log.warns[ids] = { log: [] }  } 
 			if(!log.warns[id]){ log.warns[id] = { log: [] }  } 
 			log.warns[id].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
 			log.warns[ids].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
			if(log.warns[id].log.length >= 15){ delete log.warns[id].log.shift() } 
			if(log.warns[ids].log.length >= 15){ delete log.warns[id].log.shift() }  
 		} 
 	}
	//

	// log
	 
 	function game_log(id, name, count, win_lose) {
 
 	// - - - - - - - - - - - - - - - - -   
 		if(!log.game[id]){ log.game[id] = { log: [] }  } 
 		log.game[id].log.push(`[${time()} | ${data()} | ${name}] Ставка: ${count}$ | Исход: ${win_lose.toString().replace(/0/gi, "❌").replace(/1/gi, "✅")}\n`) 
		if(log.game[id].log.length >= 15){ delete log.game[id].log.shift() }  

 	}
	//
 //------------------------------------------------------------------------------------\\
 	function lvlup(id) {
 		let text = false;
 		if(acc.users[id].exs >= acc.users[id].exsup){
 			acc.users[id].exs -= acc.users[id].exsup;
 			acc.users[id].lvl += 1;
 			if(acc.users[id].game.win < 52){acc.users[id].game.win += 1;}
 			acc.users[id].exsup += new_lvl();
 			text = true;
 		}
 		return text;
 	} 
 //------------------------------------------------------------------------------------\\
	function new_lvl(iid) {
	 	let ids = 0
	 	let numbers = [10,20,30,40,50,60];
	 	let rand = numbers.random()
	 	return rand;
	}
 //------------------------------------------------------------------------------------\\
 	function zapret(text) {
 		let text1 = text.toLowerCase();
 		let texts = 0;
 		let stat = false;
		var zaprets = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zaprets.test(text1) == true) { 
				texts = `📗 ➾ Ошибка: Эти слова внесены в реестр запрещённых!` 
				stat = true;
		}
		var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		if (filter1.test(text1) == true || filter2.test(text1) == true) { 
			texts = `📗 ➾ Ошибка: Эти слова внесены в реестр запрещённых!` 
			stat = true; 
		}
		return texts
 	} 
 
  //------------------------------------------------------------------------------------\\
 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);

 
 
 	 function time() {
			let date = new Date();
			let days = date.getDate();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			if (hours < 10) hours = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds;
			var times = hours + ':' + minutes + ':' + seconds
			return times;
	}
 //------------------------------------------------------------------------------------\\
	function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1; 
		if (month < 10) month = "0" + month;
		if (days < 10) days = "0" + days;
		var datas = days + ':' + month + ':2019' ;
		return datas;
	}
 //------------------------------------------------------------------------------------\\
 
 
  	function restart() {
 		  	for(i=1;i < 200000; i++){  
 		  		if(acc.users[i]){
				acc.users[i].bloks_cases = false
				acc.users[i].bloks_gun_case = false
				acc.users[i].bloks_frac = false
				acc.users[i].bloks_giverub = false
				acc.users[i].job_stop = false
				acc.users[i].bizs_one_stop = false
				acc.users[i].bizs_two_stop = false
				acc.users[i].safe_status = false
 				acc.users[i].safe_key = false
				}
			} 
	}

 	setInterval(() =>{
 		for(name in frac){
 			let sum = frac[name].bank;
 			frac[name].bank = 0;
 			let owner_sum = sum / 100 * 10;
 			let user_sums = sum / 100 * 90;
 			let people = frac[name].people - 1;
 			let user_sum = user_sums / people;

 			frac[name].balance += owner_sum;
 			for(i in frac[name].users){
 				frac[name].users[i].count = 0;
 				acc.users[i].balance += user_sum;
 			} 
 		}
 	}, 7200000); 

 	 function adm_log(is) {
  		let id = is[0];	
		let i = config;  
		vk.api.call('messages.send', { user_id: acc.users[1].id, message: `Поступил новый Лог Административных Действий.\n\n -- Ник Администратора: @id${acc.users[is[0]].id} (${acc.users[id].prefix})\n -- Им была Использована команда: ${is[1]}\n -- ID Профиля Администратора: @id${acc.users[is[0]].id}(${is[0]})\n -- Уровень доступа: ${acc.users[id].level.toString().replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Главный Администратор").replace(/5/gi, "Создатель")}`});
 	}
 

   	 setInterval(() =>{
 		for(i=0;i<100000;i++){
 			if(acc.users[i]){
 			 	if(acc.users[i].adm_time > 0){
 			 		acc.users[i].adm_time -= 1;
 			 		if(acc.users[i].adm_time == 0){
 			 			acc.users[i].level = 0;

 			 			vk.api.call('messages.send', {
							user_id: acc.users[i].id,
							message: `Срок действия vip/moder/admin прав истек. Вы сняты с должности.`
						});
 			 		}
 			 	}
 			}
 		}
 	}, 3600000);  	 


setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))  
	fs.writeFileSync("./base/log.json", JSON.stringify(log, null, "\t"));
	fs.writeFileSync("./base/frac.json", JSON.stringify(frac, null, "\t"));
		fs.writeFileSync("./base/akk.json", JSON.stringify(akk, null, "\t"));
}, 15000);

vk.updates.hear(/^(?:Бутылочка)\s([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`🔮 Подсказка: введи "бутылочка"`);
	let rez = [true].random();
	if(rez == false){
	}else{ 
		let count = ['Заняться сексом!', 'Поцеловаться', 'Сесть на бутылочку', 'Начать встречаться', '*Вы пропускаете ход*', 'Раздеться', 'Бухнуть', 'Пожениться'].random();
	    return message.send(`🍷 @id${user.id}(${user.prefix}), ${count} 🍷`);
	}
});

vk.updates.hear(/^(?:отработать)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].frac_name == false) return message.send(`📘 @id${user.id}(${user.prefix}), Вы не находитесь в клане`);  
	if(user.bloks_frac == true) return message.send(`📘 @id${user.id}(${user.prefix}), Работать можно раз в 10 минут)`);     
	let name = acc.users[id].frac_name; 

	frac[name].users[id].count += 1;
	frac[name].bank += 5000;
	 
	user.bloks_frac = true; 
		setTimeout(() => {
			user.bloks_frac = false;
	}, 360000);

	 
	return message.send(`
		📘 ➾ Вы отработали 10 минут на работе.
		💰 ➾ +5.000$ в копилку фракции.

		💴 ➾ Раз в 2 часа выдается зарплата за вашу работу.
		`);
});

vk.updates.hear(/^(?:погода|weather)/i, async (message) => {
	user.foolder += 1;
    let args = message.text.match(/^(?:погода|weather)\s?(.*)/i);
    if(args[1].toLowerCase() == "") return message.send(nope)
    rq("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(args[1]) + "&appid=fe198ba65970ed3877578f728f33e0f9&units=metric")
        .then((res) => {
    let Utils = {
    	filter: (text) => { 
    	text = text.replace(/^(RU)/i, 'Россия')
        text = text.replace(/^(UA)/i, 'Украина')
        text = text.replace(/^(BY)/i, 'Беларусь')
        text = text.replace(/^(KZ)/i, 'Казахстан')
        text = text.replace(/^(AE)/i, 'Объединенные Арабские Эмираты')
        return text;
    }};
    function TempTo () {
    	if(res.main.temp < -10) return 'очень холодно'
    	else if(res.main.temp < -5) return 'холодно'
    	else if(res.main.temp < 5) return 'холодновато'
    	else if(res.main.temp < 20) return 'комфортно'
    	else if(res.main.temp < 25) return 'тепло'
    	else if(res.main.temp < 30) return 'жарко'
        else if(res.main.temp < 50) return 'Очень жарко'
    };
    function Timer () {
    	let now = new Date(res.dt*1000).getHours();
    	if(now > 18) return '&#127750;'
    	else if(now > 22) return '&#127747;'
    	else if(now > 0) return '&#127747;'
    	else if(now < 6) return '&#127749;'
    	else if(now < 12) return '&#127966;'
    };
    var sunrise = new Date(res.sys.sunrise*1000);
    var sunset = new Date(res.sys.sunset*1000);
    function sunmin () {
    	if(sunrise.getMinutes() < 10) "0" + sunrise.getMinutes();
    	return sunset.getMinutes();
    };
    function sunsmin () {
    	if(sunset.getMinutes() < 10) "0" + sunset.getMinutes();
    	return sunset.getMinutes();
    };
    function daterh () {
    	if(date.getHours() < 10) "0" + date.getHours();
    	return date.getHours()
    };
    function daterm () {
    	if(date.getMinutes() < 10) "0" + date.getMinutes();
    	return date.getMinutes();
    };
    var date = new Date(res.dt*1000);
    return message.reply(`${Timer()} ${res.name}, ${Utils.filter(res.sys.country)}

➖ Сейчас там ${TempTo()}: ${res.main.temp}°С
➖ Рассвет: ${sunrise.getHours()}:${sunmin()}
➖ Закат: ${sunset.getHours()}:${sunsmin()}
➖ Скорость ветра: ${res.wind.speed} м/с`)})
});

vk.updates.hear(/^(?:кто)/i, async (message) => {
	user.foolder += 1;
	if(message.$from.type == 'user') return message.send (`команда работает только в беседе!`);
    let { profiles } = await vk.api.messages.getConversationMembers({
        peer_id: message.peerId
    });
    let profile = getRandomElement(profiles);
    await message.send(
        getRandomElement(['Это точно', 'Я уверен, что это', 'Твоя мама говрит, что это', 'Кнч, это', 'Думаю, что это', 'Наверное, это', 'Википедия говорит, что это', 'Сотку даю, что это']) + ' -- @id' + profile.id + '(' + profile.first_name + ')'
    );
});

	vk.updates.hear(/^(?:машины)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
		if(!message.$match[1]){
			return message.send(`
			➕ 1&#8419;. Mercedes S-Class - 35.000.000$
			➕ 2&#8419;. Volkswagen Phaeton - 45.000.000$
			➕ 3&#8419;. Lexus LS 430 - 60.000.000$
			➕ 4&#8419;. Skoda Rapid - 75.000.000$
			➕ 5&#8419;. Audi A8 -  95.000.000$
			➕ 6&#8419;. Range Rover - 119.000.000$
			➕ 7&#8419;. BMW X6 - 120.000.000$
			➕ 8&#8419;. Porsche Cayenne - 155.000.000$ 
			➕ 9&#8419;. BMW 7 Series - 164.000.000$
			➕ 1&#8419;0&#8419;. Lexus LX - 190.000.000$
			 
			🚘 ➾ Для покупки напишите: Машины [номер] 
			⚠ ➾ 'В путь' отправить машину в рейс.
			👉 ➾ Машина продать - для продажи.
			👉 ➾ При продаже вернется 75% от суммы.
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 35000000,45000000, 60000000,75000000,95000000,119000000,120000000,155000000,164000000,190000000];
 	let names = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
 	if(i < 0 || i > 10) return;
 	if(user.cars != false) return message.send(`🛥 ➾ У вас уже куплена машина`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 ➾ У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.cars = ids[i]; 
 		return message.send(`@id${user.id}(${user.prefix}), Вы купили машину (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
 
	vk.updates.hear(/^(?:машина продать)/i, (message) => {
		let count = [0, 1000000,5000000, 10000000,15000000,25000000,39000000,49000000,55000000,64000000,70000000];
		let user = acc.users[user_id(message.user)];
		if(user.cars == false) return message.send(`🚘 ➾ У вас нет машины`)
		let sum = count[user.cars] / 100 * 75;
		user.balance += sum; 
		user.cars = false; 
		return message.send(`@id${user.id}(${user.prefix}), Вы продали свой автомобиль за ${sum}$`)
	});

	vk.updates.hear(/^(?:в путь)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
	if(user.cars == false) return message.send(`🚘 ➾ У вас нет машины`)
		if(!message.$match[1]){
			return message.send(`
			🚘 ➾  Места для отправки машины в рейс:

			1&#8419;. в городе | 1ч 
			2&#8419;. В другой город | 2ч
			3&#8419;. За границу | 3ч 
			4&#8419;. на другой конец света | 4ч 
 
			🚘 ➾ Вернувшись из рейса вы получите трофеи.
			🚘 ➾ Чем ценнее машина, тем лучше трофеи.
			⚠ ➾ Также, случайно может сломаться машина и она пропадет. (станет мусором)
			`)
		}
	let i = message.$match[1]; 
	let name = [0, 'в городе','в другой город','за границу','на другой конец света']
	let ids = [0,1,2,3,4]
 	let time = [0,3600000,7200000,10800000,14400000]
 	let times = [0,1,2,3,4]
 	if(i < 0 || i > 4) return;
 	if(user.reys != false) return message.send(`🚘 ➾ У вас уже отправлена машина в рейс`);
 	if(i > 0 && i <= 4){   
 		user.reys = true;
 		message.send(`@id${user.id}(${user.prefix}), Вы отправили машину в рейс (${name[i]}) на ${times[i]} часов.`)
 		if(rand(1,100) < 80){

 			setTimeout(() => {
 				let a = 0;
 				if(i==1){a = rand(1500,5000)}
 				if(i==2){a = rand(5000,9000)}
 				if(i==3){a = rand(10000,15000)}
 				if(i==4){a = rand(20000,30000)}
 				let id_car = user.car;
				if(id_car < 3){a += rand(1000,3000)}
				if(id_car > 3 && id_car < 6){a += rand(5000,8000)}
				if(id_car > 6){a += rand(90000,12000)}
				user.reys = false;
				return message.send(`@id${user.id}(${user.prefix}), Ваша машина успешно вернулась с рейса. Вы получили: ${a}$`)
			}, time[message.$match[1]]);

 		}else{
 			setTimeout(() => {
	 			user.reys = false;
				user.cars = false;
				return message.send(`🚘 ➾ К несчастью ваша машина попала в аварию. Груз не был доставлен, машину отправили на мусор.`)
			}, time);
 		} 
 	 
 	} 
 });
 
 	 vk.updates.hear(/^(?:посмотреть машины)/i, (message) => {
 	 	let user = acc.users[user_id(message.user)]; 
	if(user.act == false) return message.send(`@id${user.id}(${user.prefix}), Ваш Аккаунт не активирован!\n — Для активации пиши 'Регистрация'. \n— После чего следуйте дальнейшим инструкциям.`); 
 		 return message.send(`
			1) 1&#8419;. Mercedes S-Class - 35.000.000$
			2) 2&#8419;. Volkswagen Phaeton - 45.000.000$
			3) 3&#8419;. Lexus LS 430 - 60.000.000$
			4) 4&#8419;. Skoda Rapid - 75.000.000$
			5) 5&#8419;. Audi A8 -  95.000.000$
			6) 6&#8419;. Range Rover - 119.000.000$
			7) 7&#8419;. BMW X6 - 120.000.000$
			8) 8&#8419;. Porsche Cayenne - 155.000.000$ 
			9) 9&#8419;. BMW 7 Series - 164.000.000$
			10) 1&#8419;0&#8419;. Lexus LX - 190.000.000$
			 
			🚘 ➾ Для покупки напишите: Машины [номер] 
			⚠ ➾ 'В путь' отправить машину в рейс.
			👉 ➾ Машина продать - для продажи.
			👉 ➾ При продаже вернется 75% от суммы.
		`);
		
	});