import { db } from "@/firebase/config";
import {
	collection,
	getFirestore,
	doc,
	getDoc,
	getDocs,
	setDoc,
	deleteDoc,
	writeBatch,
} from "firebase/firestore";

export const HandleCallback = async ({ bot, body }) => {
	try {
		let words = body.callback_query.data.split(" ");

		if (words[0] === "protocols") {
			let currPage = parseInt(words[1]);

			// getting all proposals
			const proposalsSnapshot = await getDocs(
				collection(db, "proposals")
			);

			// creating array of protocols
			let protocols = proposalsSnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});

			// sort by id
			protocols.sort((a, b) => {
				return a.id.localeCompare(b.id);
			});

			// setting response keyboard
			let inline_keyboard = [];
			let current_keys = [];

			// rows in page
			let rowsPerPage = 3;

			let keyboardPage = 1;
			let keyTracker = 0;

			// setting up keyboard
			protocols.map((protocol) => {
				keyTracker += 1;

				current_keys.push({
					text: protocol.data.name,
					callback_data: `proposal ${protocol.id} 1 back protocols ${keyboardPage}`,
				});

				if (current_keys.length === 3) {
					inline_keyboard.push(current_keys);
					current_keys = [];
				}

				if (keyTracker % (3 * rowsPerPage) === 0) {
					keyboardPage += 1;
				}
			});

			// pushing remaining keys
			if (current_keys.length !== 0) {
				inline_keyboard.push(current_keys);
			}

			console.log("inline_keyboard is ", inline_keyboard);

			// pagination logic

			let lastPage = Math.ceil(inline_keyboard.length / rowsPerPage);
			inline_keyboard = inline_keyboard.slice(
				(currPage - 1) * rowsPerPage,
				currPage * rowsPerPage
			);

			let pagination = [];

			if (currPage !== 1) {
				pagination.push({
					text: "Prev",
					callback_data: `protocols ${currPage - 1}`,
				});
			}

			if (currPage !== lastPage) {
				pagination.push({
					text: "Next",
					callback_data: `protocols ${currPage + 1}`,
				});
			}

			inline_keyboard.push(pagination);

			// appending close button
			inline_keyboard.push([
				{
					text: "Home",
					callback_data: "home",
				},
			]);

			// sending updated keyboard
			await bot.editMessageText("Choose your protocol 🔎", {
				chat_id: body.callback_query.message.chat.id,
				message_id: body.callback_query.message.message_id,
				reply_markup: { inline_keyboard },
			});
		} else if (words[0] === "proposal") {
			let protocol = words[1];
			let currPage = parseInt(words[2]);

			const proposalsDoc = await getDoc(doc(db, "proposals", protocol));
			let proposals = proposalsDoc.data().list;

			// setting response keyboard
			let inline_keyboard = [];

			function cleanString(inputString) {
				let stringWithoutSpaces = inputString.replace(
					/^\s+|\s+$/gm,
					""
				);

				let stringWithoutQuotes = stringWithoutSpaces.replace(/"/g, "");

				return stringWithoutQuotes;
			}

			Object.keys(proposals).map((key) => {
				const proposal = proposals[key];

				inline_keyboard.push([
					{
						text: cleanString(proposal.title),
						callback_data: `detail ${protocol} ${proposal.key} b1 ${words[4]} ${words[5]} b2 pp ${words[1]} ${words[2]}`,
					},
				]);
			});

			// pagination logic
			let rowsPerPage = 3;
			let lastPage = Math.ceil(inline_keyboard.length / rowsPerPage);
			inline_keyboard = inline_keyboard.slice(
				(currPage - 1) * rowsPerPage,
				currPage * rowsPerPage
			);

			let pagination = [];

			if (currPage !== 1) {
				pagination.push({
					text: "Prev",
					callback_data: `proposal ${protocol} ${currPage - 1} back ${
						words[4]
					} ${words[5]}`,
				});
			}

			if (currPage !== lastPage) {
				pagination.push({
					text: "Next",
					callback_data: `proposal ${protocol} ${currPage + 1} back ${
						words[4]
					} ${words[5]}`,
				});
			}

			inline_keyboard.push(pagination);

			inline_keyboard.push([
				{
					text: "Back",
					callback_data: `${words[4]} ${words[5]}`,
				},
				{
					text: "Home",
					callback_data: "home",
				},
			]);

			// sending updated keyboard
			await bot.editMessageText("Tap on the proposal to expand it 📋", {
				chat_id: body.callback_query.message.chat.id,
				message_id: body.callback_query.message.message_id,
				reply_markup: { inline_keyboard },
			});
		} else if (words[0] === "detail") {
			let inline_keyboard = [];

			inline_keyboard.push([
				{
					text: "Back",
					callback_data: `proposal ${words[8]} ${words[9]} b1 ${words[4]} ${words[5]}`,
				},
				{
					text: "Home",
					callback_data: "home",
				},
			]);

			// sending updated keyboard
			await bot.editMessageText("Details of the proposal", {
				chat_id: body.callback_query.message.chat.id,
				message_id: body.callback_query.message.message_id,
				reply_markup: { inline_keyboard },
			});
		} else if (words[0] === "home") {
			await bot.editMessageText(
				`Hey there! 👋 \n\nI'm the governance bot -- your goto companion for all things governance. What's on your mind? 👀`,
				{
					chat_id: body.callback_query.message.chat.id,
					message_id: body.callback_query.message.message_id,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "View Proposals",
									callback_data: "protocols 1",
								},
							],
							[
								{
									text: "Manage Subscriptions",
									callback_data: "subscriptions",
								},
							],
						],
						resize_keyboard: true,
						one_time_keyboard: false,
					},
				}
			);
		}
	} catch (err) {
		console.log(err);
	}
};
