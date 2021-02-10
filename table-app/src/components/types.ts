type PhoneRecordData = "Phone ID" | "ID of the relative" | "Phone";

type PhoneRecord = {
  data: {
    [key in PhoneRecordData]: string;
  };
  kids: {};
};

type RelativeRecordData =
  | "Relative ID"
  | "Patient ID"
  | "Is alive?"
  | "Frequency of visits";

type RelativeRecord = {
  data: {
    [key in RelativeRecordData]: string;
  };
  kids: {
    has_phone: {
      records: PhoneRecord[];
    };
  };
};

type MainItemData =
  | "Identification number"
  | "Name"
  | "Gender"
  | "Risk"
  | "Hair length"
  | "IQ"
  | "Admission date"
  | "Last breakdown"
  | "Yearly fee"
  | "Knows the Joker?";

type MainItem = {
  data: {
    [key in MainItemData]: string;
  };
  kids: {
    has_relatives: {
      records: RelativeRecord[];
    };
  };
};

type MainData = MainItem[];

export type {
  PhoneRecordData,
  PhoneRecord,
  RelativeRecordData,
  RelativeRecord,
  MainItemData,
  MainItem,
  MainData,
};
