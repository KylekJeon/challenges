import React from "react";
import { shallow } from "enzyme";
import Table from "..";
import camelize from "camelize";
import tableData from "../../test-data/first-page.json";
import { mockColumns, mockRows } from "../../test-data/mock-data";

describe("Table", () => {
  const testGlobal = global;
  const camelizedTableData = camelize(tableData);

  beforeEach(() => {
    testGlobal.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        url: "https://www.swapi.co/api/fake/people",
        json: () => camelizedTableData
      })
    );
  });

  afterEach(() => {
    testGlobal.fetch.mockClear();
  });

  it("should render loader with no data", () => {
    const component = shallow(<Table />);
    expect(component).toMatchSnapshot();
  });

  it("should render table with data", done => {
    const component = shallow(<Table />);

    process.nextTick(() => {
      component.update();
      expect(component).toMatchSnapshot();
      done();
    });
  });

  it("headerClick should update selected column", () => {
    const component = shallow(<Table />);
    component.setState({
      rows: mockRows,
      columns: mockColumns
    });

    component.instance().onHeaderClick(mockColumns[0]);
    expect(component.state("rows")[0].name).toBe("Beru Whitesun lars");
  });

  it("headerClick should toggle isAscending", () => {
    const component = shallow(<Table />);
    const selectedColumn = {
      ...mockColumns[0],
      selected: true,
      isAscending: true
    };
    const newColumns = [selectedColumn, ...mockColumns.slice(1)];
    component.setState({
      rows: mockRows,
      columns: newColumns
    });

    component.instance().onHeaderClick(newColumns[0]);
    expect(component.state("columns")[0].isAscending).toBe(false);
    expect(component.state("columns")[0].selected).toBe(true);
  });

  it("headerClick should sort dates", () => {
    const component = shallow(<Table />);
    component.setState({
      rows: mockRows,
      columns: mockColumns
    });

    component.instance().onHeaderClick(mockColumns[4]);
    expect(component.state("rows")[0].created).toBe("12/9/2014");
  });
});
