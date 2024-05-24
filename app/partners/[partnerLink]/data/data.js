Object.defineProperty(exports, "__esModule", { value: true });
exports.pivotData = [
    { 'Taxable Type': 31, 'Property Type': 52824, 'Property Class': 'France', 'Year': 'Mountain Bikes', 'Month': 'FY 2015', 'Quarter': 'Q1' },
    { 'Taxable Type': 51, 'Property Type': 86904, 'Property Class': 'France', 'Year': 'Mountain Bikes', 'Month': 'FY 2015', 'Quarter': 'Q2' },
];

exports.rptData = [
    { 
      'Taxable Types': 
        [
          { objid: 1, name: 'TAXABLE'},
	      { objid: 0, name: 'EXEMPT'}
        ], 
        'Property Types':
        [
          {objid: 1, code: "bldg", name: "Building"},
          {objid: 2, code: "land", name: "Land"},
          {objid: 3, code: "mach", name: "Machinery"},
          {objid: 4, code: "misc", name: "Misc"},
          {objid: 5, code: "planttree", name: "Plants/Trees"}
        ],
        'Property Classifications':
        [
            { objid: 1, code:"R", name: "RESIDENTIAL", orderno: 1, classid: "RESIDENTIAL"},
            { objid: 2, code:"A", name: "AGRICULTURAL", orderno: 2, classid: "AGRICULTURAL"},
            { objid: 3, code:"C", name: "COMMERCIAL", orderno: 3, classid: "COMMERCIAL"},
            { objid: 4, code:"I", name: "INDUSTRIAL", orderno: 4, classid: "INDUSTRIAL"},
            { objid: 5, code:"M", name: "MINERAL", orderno: 5, classid: "MINERAL"},
            { objid: 6, code:"T", name: "TIMBERLAND/FOREST", orderno: 6, classid: "TIMBERLAND"},
            { objid: 7, code:"SH", name: "HOSPITAL", orderno: 7, classid: "HOSPITAL"},
            { objid: 8, code:"SC", name: "CULTURAL", orderno: 8, classid: "CULTURAL"},
            { objid: 9, code:"SS", name: "SCIENTIFIC", orderno: 9, classid: "SCIENTIFIC"},
            { objid: 10, code:"ASLWD", name: "LOCAL WATER DISTRICT", orderno: 10, classid: "WATER DISTRICT"},
            { objid: 11, code:"SG", name: "GOCC", orderno: 11, classid: "GOCC"},
            { objid: 12, code:"ACH", name: "CHARITABLE", orderno: 13, classid: "PC8efef27:164e88e925b:20af"},
            { objid: 13, code:"ARE", name: "RELIGIOUS", orderno: 14, classid: "PC63e73ac8:15f0e0b5fc9:47e6"},
            { objid: 14, code:"ARC", name: "RECREATIONAL", orderno: 15, classid: "RECREATIONAL "},
            { objid: 15, code:"AED", name: "EDUCATIONAL", orderno: 16, classid: "PC34d99327:15ebc8d8d28:-298c"},
            { objid: 16, code:"ACT", name: "CEMETERY", orderno: 17, classid: "CEMETERY"},
            { objid: 17, code:"ARK", name: "PARK", orderno: 18, classid: "PC8efef27:164e88e925b:2085"},
            { objid: 18, code:"ANG", name: "GOV'T. CENTER-NAT'L.", orderno: 19, classid: "PC8efef27:164e88e925b:2066"},
            { objid: 19, code:"APG", name: "GOV'T. CENTER-PROV.", orderno: 20, classid: "PC-52210d7f:15da5f70ff5:19f0"},
            { objid: 20, code:"ACG", name: "GOV'T CENTER-CITY", orderno: 21, classid: "PC8efef27:164e88e925b:2366"},
            { objid: 21, code:"ERL", name: "ERODED AREA", orderno: 22, classid: "PC-3e2b1d9b:17089437247:2006"},
            { objid: 22, code:"AMG", name: "GOV'T. CENTER-MUN.", orderno: 22, classid: "PC8efef27:164e88e925b:2394"},
            { objid: 23, code:"ABG", name: "GOV'T CENTER-BRGY.", orderno: 23, classid: "PCa922f18:1626017cc7a:f38"},
            { objid: 24, code:"G", name: "GOVERNMENT", orderno: 40, classid: "PC8efef27:164e9e0f3a4:-72b1"},
            { objid: 25, code:"ROAD", name: "ROAD LOT", orderno: 58, classid: "PC-db6863c:15daaf3eb99:6b43"},
            { objid: 26, code:"RVA", name: "RIVER ALLOWANCE", orderno: 59, classid: "PC-db6863c:15dab22d388:4a80"},
            { objid: 27, code:"CCOP", name: "COOPERATIVE", orderno: 61, classid: "PC4ffe7316:15ee55a047e:71ec"},
            { objid: 28, code:"CANAL", name: "CANAL", orderno: 63, classid: "PC45ef6fc5:15f46c335f8:-2ce4"},
            { objid: 29, code:"RVC", name: "RIVER/CREEK", orderno: 64, classid: "PC572f0ec9:15f5cb3b52e:7c6"},
            { objid: 30, code:"DCC", name: "DAY CARE CENTER", orderno: 65, classid: "PC-36334135:161c05bc59b:603a"},
            { objid: 31, code:"CHS", name: "CHAPEL SITE", orderno: 67, classid: "PCa922f18:1626017cc7a:f52"},
            { objid: 32, code:"AM", name: "AGRL-MACHINE", orderno: 68, classid: "PC-3ee51bfc:16759282b3d:4e3f"},
            { objid: 33, code:"IM", name: "INDUSTRIAL MACHINE", orderno: 69, classid: "PC5bbbe5df:16a7637991c:-7c4"},
            { objid: 34, code:"TRANS", name: "TRANSMISSION", orderno: 71, classid: "PC3bb65d60:1725dbf5018:260"}
        ],
        'Report Dates': 
          [
            { objid: 2023011, year: 2023, month: 1, qtr: 1},
	        { objid: 2023021, year: 2023, month: 2, qtr: 1},
	        { objid: 2023031, year: 2023, month: 3, qtr: 1},
	        { objid: 2023041, year: 2023, month: 4, qtr: 2},
	        { objid: 2023051, year: 2023, month: 5, qtr: 2},
	        { objid: 2023061, year: 2023, month: 6, qtr: 2},
	        { objid: 2023071, year: 2023, month: 7, qtr: 3},
	        { objid: 2023081, year: 2023, month: 8, qtr: 3},
	        { objid: 2023091, year: 2023, month: 9, qtr: 3},
	        { objid: 2023101, year: 2023, month: 10, qtr: 4},
	        { objid: 2023111, year: 2023, month: 11, qtr: 4},
	        { objid: 2023121, year: 2023, month: 12, qtr: 4},
	        { objid: 2024011, year: 2024, month: 1, qtr: 1},
	        { objid: 2024021, year: 2024, month: 2, qtr: 1},
	        { objid: 2024031, year: 2024, month: 3, qtr: 1},
	        { objid: 2024041, year: 2024, month: 4, qtr: 2},
	        { objid: 2024051, year: 2024, month: 5, qtr: 2},
	        { objid: 2024061, year: 2024, month: 6, qtr: 2},
	        { objid: 2024071, year: 2024, month: 7, qtr: 3},
	        { objid: 2024081, year: 2024, month: 8, qtr: 3},
	        { objid: 2024091, year: 2024, month: 9, qtr: 3},
	        { objid: 2024101, year: 2024, month: 10, qtr: 4},
	        { objid: 2024111, year: 2024, month: 11, qtr: 4},
	        { objid: 2024121, year: 2024, month: 12, qtr: 4}
          ],
        'Report Data List': 
          [
            { propertyTypeId: 2, propertyClassId: 1, taxableTypeId: 1, reportDateId: 2024011, assessedValue: 1234.12, marketValue: 2345.67 }, 
            { propertyTypeId: 2, propertyClassId: 1, taxableTypeId: 0, reportDateId: 2024011, assessedValue: 1500.00, marketValue: 2000.00 }, 
            { propertyTypeId: 2, propertyClassId: 2, taxableTypeId: 1, reportDateId: 2024011, assessedValue: 1600.00, marketValue: 2100.00 }, 
            { propertyTypeId: 2, propertyClassId: 2, taxableTypeId: 0, reportDateId: 2024011, assessedValue: 1700.00, marketValue: 2200.00 } 
          ]
    }
]