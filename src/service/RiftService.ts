import { Rift } from "../entities/Rift";
import { River } from "../entities/River";
import { AppDataSource } from "../data-source";

const RiftRepository = AppDataSource.getRepository(Rift);
const RiverRepository = AppDataSource.getRepository(River);

export const getAll = async () => {
  let rifts = await RiftRepository.find({
    relations: {
      river: true,
    },
  });
  let riftsDto: any[] = [];
  rifts.map(async (rift) => {
    riftsDto.push({
      ...rift,
      river: rift.river.name,
    });
  });
  return riftsDto;
};

export const change = async (rift) => {
  let updatedRift = new Rift();
  const river = await RiverRepository.findOneBy({ name: rift.river });
  updatedRift = {
    ...rift,
    river: river,
  };
  return RiftRepository.save(updatedRift);
};

export const save = async () => {
  let rifts: any = [
    {
        "id": "004f0fa8-c371-4e70-9781-8eb184a0f74e",
        "image": "riftnormal",
        "latitude": 53.3084,
        "longitude": 29.063742,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Орлинское Озеро "
      },
      {
        "id": "023c2f35-f383-4222-94b6-23c9e46d6d8a",
        "image": "riftnormal",
        "latitude": 53.415461,
        "longitude": 29.002892,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Хмелинка "
      },
      {
        "id": "028dd4d5-3c21-4908-ac07-d12907d650ed",
        "image": "riftnormal",
        "latitude": 52.637843,
        "longitude": 29.806392,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Потапов отмут "
      },
      {
        "id": "051035c9-eb6d-443a-bfe7-d951e1e4f699",
        "image": "riftnormal",
        "latitude": 52.740931,
        "longitude": 29.574389,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Хвойка 2"
      },
      {
        "id": "0653d2df-b732-447d-9cf9-a35b238e0b38",
        "image": "riftnormal",
        "latitude": 52.619092,
        "longitude": 29.915194,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Терехов 2"
      },
      {
        "id": "089a7811-ffab-4fe3-9bc7-b83aa9abc3d8",
        "image": "riftnormal",
        "latitude": 53.519334,
        "longitude": 28.96197,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Притерпа 2"
      },
      {
        "id": "0a3ec529-ca72-4c5c-8cf2-eadc44a9e27d",
        "image": "riftnormal",
        "latitude": 52.647758,
        "longitude": 29.810562,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Куликово 1 "
      },
      {
        "id": "0d8ab549-3126-48d0-b837-92bcb07c3d6d",
        "image": "riftnormal",
        "latitude": 53.140829,
        "longitude": 29.259145,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бобруйск 4"
      },
      {
        "id": "15dc7666-17cb-455f-8430-46715fc64255",
        "image": "riftnormal",
        "latitude": 52.678218,
        "longitude": 29.680265,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Синеводы 2"
      },
      {
        "id": "1649666a-9940-42f2-85f8-a95202094826",
        "image": "riftnormal",
        "latitude": 53.071319,
        "longitude": 29.240283,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Поплавец 3"
      },
      {
        "id": "1655e206-45d2-45a5-b671-1d29ee78ec55",
        "image": "riftnormal",
        "latitude": 52.790509,
        "longitude": 29.493121,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Струга 1 "
      },
      {
        "id": "17fbd7e1-f3fa-4cf2-ab8f-687baaf1a8ab",
        "image": "riftnormal",
        "latitude": 52.968425,
        "longitude": 29.36552,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Белогорье "
      },
      {
        "id": "189986d9-8dd3-4244-a3bd-64f678c28046",
        "image": "riftnormal",
        "latitude": 53.333915,
        "longitude": 29.047803,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Косье верхнее"
      },
      {
        "id": "1950985d-0add-48a2-a688-b8a1b1e1ae2b",
        "image": "riftnormal",
        "latitude": 53.211919,
        "longitude": 29.23033,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Козловка "
      },
      {
        "id": "1a11c288-f66e-4a88-afc9-8b9d945c6d2a",
        "image": "riftnormal",
        "latitude": 53.012855,
        "longitude": 29.290188,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Хустное 2"
      },
      {
        "id": "1b3e8c92-f7b0-4329-93e7-d5df42c8bb8d",
        "image": "riftnormal",
        "latitude": 53.492198,
        "longitude": 28.958392,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Городок"
      },
      {
        "id": "1c2806b0-c41f-4fbc-a238-ecf9ee4c08c6",
        "image": "riftnormal",
        "latitude": 52.597139,
        "longitude": 29.967653,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Алексин 2"
      },
      {
        "id": "1ccba379-6f4a-48c0-bcd3-f7dec817cfa6",
        "image": "riftnormal",
        "latitude": 52.602346,
        "longitude": 29.950048,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Алексин 1 "
      },
      {
        "id": "1d106318-b4cf-469a-8423-38b68b42f3d7",
        "image": "riftnormal",
        "latitude": 53.042266,
        "longitude": 29.264152,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Лесники 2"
      },
      {
        "id": "1f3a1db0-4e55-42ad-8afa-333be066ac71",
        "image": "riftnormal",
        "latitude": 53.511787,
        "longitude": 28.965729,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Притерпа 3"
      },
      {
        "id": "210b8300-2152-453c-9f4f-fd94ffa0b70a",
        "image": "riftnormal",
        "latitude": 52.888085,
        "longitude": 29.345116,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Васильевка 3"
      },
      {
        "id": "2175b0af-f6bd-4a24-9a35-43dac4bbe058",
        "image": "riftnormal",
        "latitude": 52.681524,
        "longitude": 29.67356,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чирковичи 3"
      },
      {
        "id": "22d1e674-303e-42b9-a5d0-42ee799c5842",
        "image": "riftnormal",
        "latitude": 52.813337,
        "longitude": 29.447314,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Паричи 4"
      },
      {
        "id": "2584997e-9d4e-4364-ac17-c19034f7154a",
        "image": "riftnormal",
        "latitude": 52.570084,
        "longitude": 30.167101,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чернейск 3"
      },
      {
        "id": "27e7a284-69e8-45e3-875f-eab5bba01774",
        "image": "riftnormal",
        "latitude": 52.744752,
        "longitude": 29.567691,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Хвойка 1 "
      },
      {
        "id": "28ba2680-683c-42cd-9ba6-2f44e5f9cdf3",
        "image": "riftnormal",
        "latitude": 53.445701,
        "longitude": 28.967181,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Лавочка "
      },
      {
        "id": "2997677c-5898-4ff8-958b-386a0275efea",
        "image": "riftnormal",
        "latitude": 52.616432,
        "longitude": 29.932551,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Муреевка "
      },
      {
        "id": "29e80cca-74d1-474f-a209-6752b3393895",
        "image": "riftnormal",
        "latitude": 52.625013,
        "longitude": 29.913167,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Терехов 1 "
      },
      {
        "id": "2b4e63ec-7401-4b2c-a670-0db4f5e5223b",
        "image": "riftnormal",
        "latitude": 53.679124,
        "longitude": 28.957424,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бродецкий перевоз "
      },
      {
        "id": "2ea1e257-7f3e-4ba3-b239-e819957d8c11",
        "image": "riftnormal",
        "latitude": 52.655721,
        "longitude": 29.716021,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Какель "
      },
      {
        "id": "2f35e48b-0b4a-476f-9deb-cd03f93433ad",
        "image": "riftnormal",
        "latitude": 53.096056,
        "longitude": 29.250364,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Поплавец 1 "
      },
      {
        "id": "2fd488e8-d6f5-4b2c-90eb-26d09f5cb9a3",
        "image": "riftnormal",
        "latitude": 53.505184,
        "longitude": 28.959577,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Стодолка "
      },
      {
        "id": "300e0e28-4abe-457e-a725-7a59ecbc124c",
        "image": "riftnormal",
        "latitude": 52.630727,
        "longitude": 29.826288,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Якимова слобода 1 "
      },
      {
        "id": "30884a28-69db-4d0d-a663-08acb83a5690",
        "image": "riftnormal",
        "latitude": 53.395157,
        "longitude": 29.017435,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Елизово 1 "
      },
      {
        "id": "31df9f4d-9962-48a5-ae11-11ad6114463e",
        "image": "riftnormal",
        "latitude": 52.662399,
        "longitude": 29.707425,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Белая гора 2"
      },
      {
        "id": "334e25a0-2196-479b-9e21-7d6c2be62aa2",
        "image": "riftnormal",
        "latitude": 52.706071,
        "longitude": 29.605132,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Грузкое 2"
      },
      {
        "id": "34e0ed64-c3ae-46eb-ac93-9dd33fc7c684",
        "image": "riftnormal",
        "latitude": 52.901561,
        "longitude": 29.340926,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Васильевка 1 "
      },
      {
        "id": "35516436-eac4-446c-a7cb-a0d7ed15ab79",
        "image": "riftnormal",
        "latitude": 52.557435,
        "longitude": 30.141238,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чернейск 1 "
      },
      {
        "id": "380a5753-d804-4345-8455-26f83747cca3",
        "image": "riftnormal",
        "latitude": 53.647047,
        "longitude": 28.934993,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Городище 2 "
      },
      {
        "id": "392ada8e-50cf-470c-b00a-8bab787e5c2b",
        "image": "riftnormal",
        "latitude": 53.279754,
        "longitude": 29.082774,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Голынка 1 "
      },
      {
        "id": "3b97429e-b509-425d-8778-6ba0ebc8ff94",
        "image": "riftnormal",
        "latitude": 52.784221,
        "longitude": 29.49646,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Струга 2"
      },
      {
        "id": "3ddde9b5-8a3c-4d5f-ab30-10c7e5ca3ba2",
        "image": "riftnormal",
        "latitude": 52.796458,
        "longitude": 29.474062,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бельчо 1 "
      },
      {
        "id": "3f4b5589-6636-4e53-a00f-d9106ed95137",
        "image": "riftnormal",
        "latitude": 53.3768,
        "longitude": 29.034525,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Столяры 1 "
      },
      {
        "id": "4033238a-5e73-4426-96aa-6c575be158a4",
        "image": "riftnormal",
        "latitude": 52.620438,
        "longitude": 29.852439,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Якимова слобода 4"
      },
      {
        "id": "4cd5c4d3-4313-4630-8bd0-cda6a2fffb30",
        "image": "riftnormal",
        "latitude": 52.699483,
        "longitude": 29.610465,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Грузкое 3"
      },
      {
        "id": "4e0bb188-06e3-46ab-b2a3-2d4980405bd0",
        "image": "riftnormal",
        "latitude": 52.809839,
        "longitude": 29.433643,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Паричи 2"
      },
      {
        "id": "4f4f7546-b08f-4ad2-a504-8589f0a0cf16",
        "image": "riftnormal",
        "latitude": 52.640246,
        "longitude": 29.752192,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Шатилки 1 "
      },
      {
        "id": "51c5b2c0-d528-4709-a15a-22dea3675746",
        "image": "riftnormal",
        "latitude": 53.275705,
        "longitude": 29.091874,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Голынка 2 "
      },
      {
        "id": "51de70b6-30d8-4722-9534-81d454a30365",
        "image": "riftnormal",
        "latitude": 53.036461,
        "longitude": 29.272425,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Лопаты 1 "
      },
      {
        "id": "53d1d603-ee43-4be2-bc91-01e258fc7b10",
        "image": "riftnormal",
        "latitude": 52.575539,
        "longitude": 30.167176,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Старый перевоз "
      },
      {
        "id": "55d22dff-d58f-4a83-b55f-786f61a994bb",
        "image": "riftnormal",
        "latitude": 52.80474,
        "longitude": 29.468194,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бучье 2 "
      },
      {
        "id": "57678e54-ef11-442f-b675-3c461b3f9215",
        "image": "riftnormal",
        "latitude": 53.006393,
        "longitude": 29.282403,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Хустное 3"
      },
      {
        "id": "57a15aaf-448f-41c6-9215-cda8fc1ccbc7",
        "image": "riftnormal",
        "latitude": 52.549197,
        "longitude": 30.240079,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Мартыновское устье 2"
      },
      {
        "id": "5893025f-5ddc-4cea-8227-d85d8c364cba",
        "image": "riftnormal",
        "latitude": 53.323654,
        "longitude": 29.061702,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Косье нижнее"
      },
      {
        "id": "5a13b596-4773-4e15-84be-44fcb2104773",
        "image": "riftnormal",
        "latitude": 52.623076,
        "longitude": 29.898861,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чертянка 2"
      },
      {
        "id": "5a6f2ec8-77f1-496a-8bc2-93d6c9259755",
        "image": "riftnormal",
        "latitude": 53.438985,
        "longitude": 28.976209,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Свислочь "
      },
      {
        "id": "5abea599-5eaf-44da-8d59-91d97cd11d88",
        "image": "riftnormal",
        "latitude": 52.560792,
        "longitude": 30.200496,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Мартыновка 1 "
      },
      {
        "id": "5b76cb24-a4dd-4903-aea0-e4baba881c5b",
        "image": "riftnormal",
        "latitude": 52.678774,
        "longitude": 29.662634,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чирковичи 2"
      },
      {
        "id": "5ba002cb-724a-4d1e-9d43-bbd5e3b4556e",
        "image": "riftnormal",
        "latitude": 53.466611,
        "longitude": 28.959135,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Н. Ловажи "
      },
      {
        "id": "5e572177-7f7b-40bb-b1fd-883c7be27f60",
        "image": "riftnormal",
        "latitude": 53.265584,
        "longitude": 29.092789,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Вербки "
      },
      {
        "id": "615fb1e8-4c08-423d-96dd-31cae14ea93c",
        "image": "riftnormal",
        "latitude": 53.152299,
        "longitude": 29.25484,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бобруйск 2"
      },
      {
        "id": "632c5d9d-ced7-4434-9e5e-e2192b5f9b3e",
        "image": "riftnormal",
        "latitude": 53.219412,
        "longitude": 29.229643,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Луки "
      },
      {
        "id": "65f65fc3-a2cc-4e7f-a74b-1c6c02422c07",
        "image": "riftnormal",
        "latitude": 53.101988,
        "longitude": 29.250151,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Березин. Форштадт 2 "
      },
      {
        "id": "66f0841b-74d4-4817-9d5c-07d720fa3972",
        "image": "riftnormal",
        "latitude": 53.527595,
        "longitude": 28.962524,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Притерпа 1 "
      },
      {
        "id": "68ea584d-d747-4919-b99b-39b3f4f6ab3f",
        "image": "riftnormal",
        "latitude": 52.968715,
        "longitude": 29.352621,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Холмы 2"
      },
      {
        "id": "6ac10a2d-b5c4-4707-8f84-13419c045b54",
        "image": "riftnormal",
        "latitude": 53.244252,
        "longitude": 29.15924,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Полумерский плес 1 "
      },
      {
        "id": "6bc911a2-93af-40ac-9723-1fd8460a768f",
        "image": "riftnormal",
        "latitude": 52.858164,
        "longitude": 29.370189,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Михайловка 2"
      },
      {
        "id": "6f3e8a5b-0266-498d-bf45-7dbdd034d61b",
        "image": "riftnormal",
        "latitude": 53.383103,
        "longitude": 29.029951,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Елизово В. "
      },
      {
        "id": "6f832858-0b46-4bed-ad35-71ee74828813",
        "image": "riftnormal",
        "latitude": 52.630896,
        "longitude": 29.808437,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Ореховка 2"
      },
      {
        "id": "71b9f40a-f291-4351-8700-5a840c90dd3e",
        "image": "riftnormal",
        "latitude": 53.730741,
        "longitude": 28.953232,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Едлино 2 "
      },
      {
        "id": "7599ea24-c991-4f31-8fba-621ac8564297",
        "image": "riftnormal",
        "latitude": 53.652965,
        "longitude": 28.938294,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Городище 1 "
      },
      {
        "id": "79f1107d-08ae-4c89-8925-5066f590cc54",
        "image": "riftnormal",
        "latitude": 53.135601,
        "longitude": 29.258539,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Зеленка "
      },
      {
        "id": "7b70f137-0e54-4f37-bab8-a54868161c7c",
        "image": "riftnormal",
        "latitude": 52.683763,
        "longitude": 29.637835,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Добрыня "
      },
      {
        "id": "7c87b4e1-1c43-4eba-94e1-53e34627d9dc",
        "image": "riftnormal",
        "latitude": 52.806753,
        "longitude": 29.434265,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Паричи 3"
      },
      {
        "id": "7d72a28b-b6fe-4b93-9234-143e35d2e77c",
        "image": "riftnormal",
        "latitude": 52.777246,
        "longitude": 29.503932,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Заостровье "
      },
      {
        "id": "7e8ac11e-f35b-46e0-8697-1959981a77b6",
        "image": "riftnormal",
        "latitude": 53.30186,
        "longitude": 29.068067,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Красн. Поселок "
      },
      {
        "id": "7ed81eb7-ebbe-42d1-b20a-a463d1dc7a49",
        "image": "riftnormal",
        "latitude": 52.744187,
        "longitude": 29.546271,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Брусенка "
      },
      {
        "id": "86bae26f-76f3-44e4-822a-5cc20e7d2628",
        "image": "riftnormal",
        "latitude": 52.559888,
        "longitude": 30.221972,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Мартыновка 2"
      },
      {
        "id": "8ca9be73-2a9a-4e36-b636-9d0572e37265",
        "image": "riftnormal",
        "latitude": 53.4821,
        "longitude": 28.947391,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Ямное "
      },
      {
        "id": "8d866e9f-be4f-46fa-b222-fdba3ae498dc",
        "image": "riftnormal",
        "latitude": 52.685197,
        "longitude": 29.688794,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Синеводы 1 "
      },
      {
        "id": "93019373-b581-4c3c-a840-ab926f882e2e",
        "image": "riftnormal",
        "latitude": 52.632288,
        "longitude": 29.798627,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Ореховка 1 "
      },
      {
        "id": "94577918-9f56-4f42-8474-61bdc7c1245a",
        "image": "riftnormal",
        "latitude": 52.977168,
        "longitude": 29.299866,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Волышино "
      },
      {
        "id": "9602a956-379b-46a1-822a-464930fc8e85",
        "image": "riftnormal",
        "latitude": 52.860416,
        "longitude": 29.357917,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Михайловка 1 "
      },
      {
        "id": "960fd4b9-db34-4b81-8346-6860a023aa4a",
        "image": "riftnormal",
        "latitude": 52.94569,
        "longitude": 29.371275,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Полянки 2"
      },
      {
        "id": "9cbbec8d-b38e-4990-a4dc-2c42880be56f",
        "image": "riftnormal",
        "latitude": 52.935043,
        "longitude": 29.346784,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Королевская слобода "
      },
      {
        "id": "9d28fafc-b071-411c-a6f1-43d5ddfeca12",
        "image": "riftnormal",
        "latitude": 52.643532,
        "longitude": 29.761824,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Шатилки 2"
      },
      {
        "id": "a09b05e7-392a-4853-bb1a-119430c7fb4c",
        "image": "riftnormal",
        "latitude": 52.56872,
        "longitude": 30.150309,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чернейск 2"
      },
      {
        "id": "a0c0bb3d-10b4-4c16-a919-125c86e32d07",
        "image": "riftnormal",
        "latitude": 52.649306,
        "longitude": 29.774579,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Сельное "
      },
      {
        "id": "a1a7a7ff-d0e6-4873-ba5f-6f14fe9678d2",
        "image": "riftnormal",
        "latitude": 53.148021,
        "longitude": 29.262399,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бобруйск 3"
      },
      {
        "id": "a3c3189b-0106-4433-b93f-3991a0aea7dd",
        "image": "riftnormal",
        "latitude": 53.796646,
        "longitude": 28.967144,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Светлица 2"
      },
      {
        "id": "a9eaf748-e1ce-4ab4-8618-da09c88db4e6",
        "image": "riftnormal",
        "latitude": 52.974168,
        "longitude": 29.347621,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Холмы 1 "
      },
      {
        "id": "b0d43d2e-b143-4b46-8b75-475c7a9a906b",
        "image": "riftnormal",
        "latitude": 53.226283,
        "longitude": 29.225365,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Щатково 2 "
      },
      {
        "id": "b1c7378f-203e-4c00-8c83-aca9c1fc11f5",
        "image": "riftnormal",
        "latitude": 52.763377,
        "longitude": 29.539754,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Воротень 2"
      },
      {
        "id": "b21d9aa9-1e96-48c8-808f-472102c7518f",
        "image": "riftnormal",
        "latitude": 53.429235,
        "longitude": 28.99709,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Дворец "
      },
      {
        "id": "ba49db39-a659-4aef-8ffa-a6af81bfa212",
        "image": "riftnormal",
        "latitude": 52.722795,
        "longitude": 29.604327,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Грузкое 1 "
      },
      {
        "id": "badefe39-693f-49f8-bca3-3ba88dfd786f",
        "image": "riftnormal",
        "latitude": 52.956142,
        "longitude": 29.372112,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Полянки 1 "
      },
      {
        "id": "bc2deb5c-147a-40f5-bf1b-c8812a098827",
        "image": "riftnormal",
        "latitude": 53.445147,
        "longitude": 28.972895,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Цыганка "
      },
      {
        "id": "bc92c929-acee-43ca-9c3f-5eefc64a96a6",
        "image": "riftnormal",
        "latitude": 52.894392,
        "longitude": 29.336983,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Васильевка 2"
      },
      {
        "id": "be47f460-99ff-4633-baec-76b5c23bb0f5",
        "image": "riftnormal",
        "latitude": 53.17971,
        "longitude": 29.252927,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Течка "
      },
      {
        "id": "be6cc0d6-4b08-4bd0-87b7-ea41e6a062a3",
        "image": "riftnormal",
        "latitude": 52.589982,
        "longitude": 29.998253,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Байдачище "
      },
      {
        "id": "bf451d9e-cd3a-457d-b71a-72d12233ad88",
        "image": "riftnormal",
        "latitude": 53.233639,
        "longitude": 29.197485,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Щатково 1 "
      },
      {
        "id": "bff5a5a0-d3aa-43ac-b845-05e644763e6b",
        "image": "riftnormal",
        "latitude": 52.646096,
        "longitude": 29.728039,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Шатилки Верхние "
      },
      {
        "id": "c0603645-cced-4fc6-bbc6-0df19253cb8e",
        "image": "riftnormal",
        "latitude": 52.574193,
        "longitude": 30.03228,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Домайковка "
      },
      {
        "id": "c23513c1-e0be-4863-9c00-0517ca15c694",
        "image": "riftnormal",
        "latitude": 52.639222,
        "longitude": 29.789198,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Куликово 2"
      },
      {
        "id": "c2741f01-42ab-4af2-9e8b-42c1312371d2",
        "image": "riftnormal",
        "latitude": 53.234782,
        "longitude": 29.171192,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Полумерский плес 2"
      },
      {
        "id": "c3035a4d-a709-4a9e-9bbc-dc69645d384d",
        "image": "riftnormal",
        "latitude": 52.73066,
        "longitude": 29.592496,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Здудичи 1  "
      },
      {
        "id": "c50d2833-200d-4fd3-8798-bee9667bed17",
        "image": "riftnormal",
        "latitude": 53.052188,
        "longitude": 29.253091,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Селиба "
      },
      {
        "id": "ca096bdf-0b78-4a35-8402-e4f8b8c401f3",
        "image": "riftnormal",
        "latitude": 53.60662,
        "longitude": 28.925874,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Якшицы "
      },
      {
        "id": "cea640d6-1fe1-4001-bb6a-bcef1430ff0e",
        "image": "riftnormal",
        "latitude": 53.120654,
        "longitude": 29.255812,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Березин. Форштадт 1 "
      },
      {
        "id": "ceb2a558-3220-4605-9e61-0a236adc1970",
        "image": "riftnormal",
        "latitude": 52.63313,
        "longitude": 29.838305,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Якимова слобода 2"
      },
      {
        "id": "ceb50c11-ba35-496f-9539-9621530c76fa",
        "image": "riftnormal",
        "latitude": 52.633361,
        "longitude": 29.846298,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Якимова слобода 3"
      },
      {
        "id": "d125b034-dc47-4fbf-ba7f-fe3fb695b4c9",
        "image": "riftnormal",
        "latitude": 52.752971,
        "longitude": 29.548116,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Колдыбань "
      },
      {
        "id": "d309b6f9-970c-4241-8654-3b8be172897e",
        "image": "riftnormal",
        "latitude": 53.196867,
        "longitude": 29.240866,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Назаровка "
      },
      {
        "id": "d53af0a1-25b3-45cd-a3f5-8de367c37520",
        "image": "riftnormal",
        "latitude": 52.689541,
        "longitude": 29.620333,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Стужки "
      },
      {
        "id": "d5cc9fe8-a9b2-4518-a555-8d5eacfa9a2b",
        "image": "riftnormal",
        "latitude": 53.052197,
        "longitude": 29.265917,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Лесники 1 "
      },
      {
        "id": "d65877c6-b01b-4c1d-afd5-e5dc64bb250a",
        "image": "riftnormal",
        "latitude": 52.801409,
        "longitude": 29.498243,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бельчо 3"
      },
      {
        "id": "d948a76f-bc0f-4f9e-921d-6a8b8d76274c",
        "image": "riftnormal",
        "latitude": 52.845526,
        "longitude": 29.3872,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Белица 1 "
      },
      {
        "id": "d9698a39-bc68-4c00-a7a7-5078ecf9425a",
        "image": "riftnormal",
        "latitude": 52.597947,
        "longitude": 29.994252,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Отрубы 2"
      },
      {
        "id": "dc918d2f-2c1b-4bc8-8c0b-95afa5e36c41",
        "image": "riftnormal",
        "latitude": 52.68485,
        "longitude": 29.65177,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чирковичи 1 "
      },
      {
        "id": "de42452a-2559-422e-9cd6-3ff27325a22b",
        "image": "riftnormal",
        "latitude": 52.802997,
        "longitude": 29.481517,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бельчо 2"
      },
      {
        "id": "df4274b6-b224-4e3c-b4c1-1df0bc59caed",
        "image": "riftnormal",
        "latitude": 52.55164,
        "longitude": 30.121599,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чернейские острова "
      },
      {
        "id": "e080e28e-b782-4e82-94c6-f58e87dba7ee",
        "image": "riftnormal",
        "latitude": 53.802355,
        "longitude": 28.970455,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Светлица 1 "
      },
      {
        "id": "e134c0af-6453-4fab-9beb-639a43e0baa5",
        "image": "riftnormal",
        "latitude": 52.549966,
        "longitude": 30.096757,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Гогали "
      },
      {
        "id": "e20e4ce4-81eb-4194-8c4e-7c73c1131df7",
        "image": "riftnormal",
        "latitude": 53.014813,
        "longitude": 29.276372,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Хустное 1 "
      },
      {
        "id": "e2214f08-b9e6-4300-b253-5b5267a6f89b",
        "image": "riftnormal",
        "latitude": 52.597214,
        "longitude": 29.982104,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Отрубы 1 "
      },
      {
        "id": "e4d1aac5-6955-44bf-ab00-7461b9b24137",
        "image": "riftnormal",
        "latitude": 52.620644,
        "longitude": 29.884593,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Чертянка 1 "
      },
      {
        "id": "e6bda3fa-0735-4502-a461-bf1eb22ffe1e",
        "image": "riftnormal",
        "latitude": 53.08161,
        "longitude": 29.256686,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Поплавец 2"
      },
      {
        "id": "e6cea18d-5525-4ce9-b13d-85935240617e",
        "image": "riftnormal",
        "latitude": 53.057732,
        "longitude": 29.255457,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Н. Доманово 2"
      },
      {
        "id": "e8fcbfba-a58c-46c0-a781-b44435cde5a0",
        "image": "riftnormal",
        "latitude": 52.671274,
        "longitude": 29.701161,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Белая гора 1 "
      },
      {
        "id": "e928ab96-25a2-4fe7-ad5f-104cbaa89797",
        "image": "riftnormal",
        "latitude": 53.166843,
        "longitude": 29.240268,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Фандок"
      },
      {
        "id": "eabd9e5d-6886-478e-9211-f7fd2579e64a",
        "image": "riftnormal",
        "latitude": 52.552351,
        "longitude": 30.233074,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Мартыновское устье 1 "
      },
      {
        "id": "eac6187b-f59e-42c2-aa1c-7cb744d7b550",
        "image": "riftnormal",
        "latitude": 52.864362,
        "longitude": 29.347453,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Красновка "
      },
      {
        "id": "eb9a3eb0-da29-4c4b-ad06-ece1ddabf0c0",
        "image": "riftnormal",
        "latitude": 52.836769,
        "longitude": 29.386689,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Белица 2"
      },
      {
        "id": "ee01ffe2-4836-436b-b656-4ea5817ba9bb",
        "image": "riftnormal",
        "latitude": 53.570038,
        "longitude": 28.963037,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Закорки "
      },
      {
        "id": "f0542f66-9982-4670-9af1-babdc61926cb",
        "image": "riftnormal",
        "latitude": 52.725761,
        "longitude": 29.601219,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Здудичи 2"
      },
      {
        "id": "f0bd091c-fe54-4634-975f-78d813ad01cc",
        "image": "riftnormal",
        "latitude": 52.803785,
        "longitude": 29.452996,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бучье 1 "
      },
      {
        "id": "f1528d1b-2120-4cdc-9fd9-bef50305c115",
        "image": "riftnormal",
        "latitude": 53.158392,
        "longitude": 29.25181,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Бобруйск 1 "
      },
      {
        "id": "f2eb75ba-4e8e-42e8-af8f-014e3c84d3b8",
        "image": "riftnormal",
        "latitude": 53.717214,
        "longitude": 28.962926,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Божино "
      },
      {
        "id": "f5da2f05-901a-4a28-9899-d2623bdd96c7",
        "image": "riftnormal",
        "latitude": 52.557749,
        "longitude": 30.063855,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Ветка "
      },
      {
        "id": "f618e991-f19e-4a3a-b7e9-4a2cfc74dafb",
        "image": "riftnormal",
        "latitude": 53.743346,
        "longitude": 28.93787,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Едлино 1 "
      },
      {
        "id": "f672a209-3e52-439b-98d9-c7380c19ab9a",
        "image": "riftnormal",
        "latitude": 52.817969,
        "longitude": 29.432531,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Паричи 1 "
      },
      {
        "id": "f8507f16-8930-4984-89cf-7d6589e200b2",
        "image": "riftnormal",
        "latitude": 52.771898,
        "longitude": 29.523988,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Воротень 1 "
      },
      {
        "id": "f96137ca-8244-4828-8bba-5bcb1b3a216a",
        "image": "riftnormal",
        "latitude": 52.561335,
        "longitude": 30.104695,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Глушица "
      },
      {
        "id": "fc19e5c4-d321-4482-9e15-6f9b5a686943",
        "image": "riftnormal",
        "latitude": 53.767687,
        "longitude": 28.941449,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Каменье "
      },
      {
        "id": "fccaa55b-29c8-4255-9c2f-e48dd6d35fea",
        "image": "riftnormal",
        "latitude": 53.066563,
        "longitude": 29.247539,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Глубокий "
      },
      {
        "id": "feb94e91-3256-4544-95f5-22191b16e8ef",
        "image": "riftnormal",
        "latitude": 53.028644,
        "longitude": 29.271257,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Лопаты 2"
      },
      {
        "id": "ff329136-3550-479c-a796-51cfa5e8eba7",
        "image": "riftnormal",
        "latitude": 53.557384,
        "longitude": 28.957122,
        "currentWaterLevel": 220,
        "waterLevel": 220,
        "description": "Островский перевоз"
      }
  ];

  let river = new River();
  river.id = '2';
  rifts.forEach(async (rift) => {
    let riftObj = new Rift();
    riftObj = {
      ...rift,
      river: river,
    };
    await RiftRepository.save(riftObj);
  });
};


export const deleteByRiver = async (riverId: string) => {
 

  try {
    let river = new River();
    river.id = riverId;
    const riftsToDelete = await RiftRepository.find({ where: { river } });
    await RiftRepository.remove(riftsToDelete);
  } catch (error) {
    console.error("Error:", error);
  }
};