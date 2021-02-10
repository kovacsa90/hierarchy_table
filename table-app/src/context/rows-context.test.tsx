import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { RowsProvider, useRows } from "./rows-context";
import { MainData } from "../components/types";

const testData: MainData = [
  {
    data: {
      "Identification number": "34",
      Name: "Joqmo",
      Gender: "female",
      Risk: "BITES",
      "Hair length": "6.2000000000",
      IQ: "98",
      "Admission date": "Mon Dec 13 00:00:00 CET 1993",
      "Last breakdown": "Wed Dec 24 07:14:50 CET 2014",
      "Yearly fee": "67035",
      "Knows the Joker?": "true",
    },
    kids: {
      has_relatives: {
        records: [
          {
            data: {
              "Relative ID": "1007",
              "Patient ID": "34",
              "Is alive?": "true",
              "Frequency of visits": "29",
            },
            kids: {
              has_phone: {
                records: [
                  {
                    data: {
                      "Phone ID": "2008",
                      "ID of the relative": "1007",
                      Phone: "+(179)-982-0570",
                    },
                    kids: {},
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
];

let consoleSpy: jest.SpyInstance;
beforeEach(() => {
  consoleSpy = jest.spyOn(console, "error");
  consoleSpy.mockImplementation(jest.fn);
});

afterEach(() => {
  cleanup();
  consoleSpy.mockRestore();
});

const DummyComponent: React.FC = () => {
  const { rows } = useRows();
  const firstRowName = rows[0].data.Name;
  return <div>{`Name in the first row: ${firstRowName}`}</div>;
};

test("useRows throws error without RowsProvider", () => {
  expect(() => render(<DummyComponent />)).toThrow();
});

test("renders the dummy component with value from the context", () => {
  render(
    <RowsProvider
      context={{
        rows: testData,
        setRows: jest.fn(),
      }}
    >
      <DummyComponent />
    </RowsProvider>,
  );

  expect(screen.queryByText(/Name in the first row: Joqmo/i)).toBeTruthy();
});
