export const ContractAbi = `{"source":{"hash":"0x0bd913fd0e1c8d7f0f2ce09c7117c570cebc8be6eec46751d8857858c895f361","language":"ink! 4.0.0","compiler":"rustc 1.70.0-nightly","build_info":{"build_mode":"Release","cargo_contract_version":"2.0.2","rust_toolchain":"nightly-aarch64-apple-darwin","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"price_oracle","version":"0.0.1","authors":["Starlay Finance"]},"spec":{"constructors":[{"args":[],"docs":[],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":1},"selector":"0x9bae9d5e"}],"docs":[],"events":[],"lang_error":{"displayName":["ink","LangError"],"type":3},"messages":[{"args":[{"label":"asset","type":{"displayName":["priceoracle_external","GetUnderlyingPriceInput1"],"type":4}}],"docs":[],"label":"PriceOracle::get_underlying_price","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":7},"selector":"0x06bfb0ca"},{"args":[{"label":"asset","type":{"displayName":["priceoracle_external","SetFixedPriceInput1"],"type":4}},{"label":"value","type":{"displayName":["priceoracle_external","SetFixedPriceInput2"],"type":0}}],"docs":[],"label":"PriceOracle::set_fixed_price","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x17e82cb2"},{"args":[{"label":"asset","type":{"displayName":["priceoracle_external","GetPriceInput1"],"type":4}}],"docs":[],"label":"PriceOracle::get_price","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":7},"selector":"0xef13a0ce"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"struct":{"fields":[{"layout":{"root":{"layout":{"leaf":{"key":"0xce5ae73e","ty":0}},"root_key":"0xce5ae73e"}},"name":"fixed_prices"}],"name":"Data"}},"name":"price_oracle"}],"name":"PriceOracleContract"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"primitive":"u128"}}},{"id":1,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":2},{"name":"E","type":3}],"path":["Result"]}},{"id":2,"type":{"def":{"tuple":[]}}},{"id":3,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":4,"type":{"def":{"composite":{"fields":[{"type":5,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":5,"type":{"def":{"array":{"len":32,"type":6}}}},{"id":6,"type":{"def":{"primitive":"u8"}}},{"id":7,"type":{"def":{"variant":{"variants":[{"fields":[{"type":8}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":8},{"name":"E","type":3}],"path":["Result"]}},{"id":8,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":0}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":0}],"path":["Option"]}},{"id":9,"type":{"def":{"variant":{"variants":[{"fields":[{"type":10}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":10},{"name":"E","type":3}],"path":["Result"]}},{"id":10,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2}],"index":0,"name":"Ok"},{"fields":[{"type":11}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":2},{"name":"E","type":11}],"path":["Result"]}},{"id":11,"type":{"def":{"variant":{}},"path":["logics","traits","price_oracle","Error"]}}],"version":"4"}`;
export const ContractFile = `{"source":{"hash":"0x0bd913fd0e1c8d7f0f2ce09c7117c570cebc8be6eec46751d8857858c895f361","language":"ink! 4.0.0","compiler":"rustc 1.70.0-nightly","wasm":"0x0061736d0100000001330860027f7f0060000060037f7f7f0060047f7f7f7f017f60087f7f7e7f7f7f7f7f017f60037e7e7f006000017f60037e7e7e0002810107057365616c310b6765745f73746f726167650003057365616c301176616c75655f7472616e736665727265640000057365616c310463616c6c0004057365616c3005696e7075740000057365616c320b7365745f73746f726167650003057365616c300b7365616c5f72657475726e000203656e76066d656d6f727902010210030f0e02000200050600070101010001010608017f01418080040b071102066465706c6f7900120463616c6c00130aa9180e2c01017f037f2002200346047f200005200020036a200120036a2d00003a0000200341016a21030c010b0b1a0b0a0020012000412010080b3901027f02402000280208220320026a220420034f0440200420002802044d0d010b000b200028020020036a200120021006200020043602080b2601017f230041106b220224002002200036020c20012002410c6a41041008200241106a24000b2a01017f230041106b2203240020032001370308200320003703002002200341101008200341106a24000b5502027f027e230041206b22002400200041106a22014200370300200042003703082000411036021c200041086a2000411c6a10012001290300210220002903082103200041206a2400410541042002200384501b0bd20102047f037e230041106b22022400200242808001370204200241b0800436020041beceebf27c2002100920012002100702402002280204220420022802082201490d00200228020021032002200420016b220436020020032001200120036a2201200210002103200420022802002205492003410c4f720d00024002402003410274418080046a2802000e0400020201020b20054110490d01200141086a290000210820012900002107420121060b2000200737030820002006370300200041106a2008370300200241106a24000f0b000b7501027f230041106b22032400200341808001360204200341b0800436020041b0800441003a000002402000500440410221042003410236020841b1800441003a00000c010b41b1800441013a000020034102360208200120022003100a2003280208220441818001490d00000b410020041011000b120041b0800441003b0100410041021011000b130041b080044181023b0100410141021011000b5001037f230041106b22002400200042808001370204200041b080043602004100200010092000280208220120002802044b0440000b200028020022022001200120026a410010041a200041106a24000b0d00200041b0800420011005000b6101017f230041106b2200240002400240100b41ff01714105470d0020004180800136020c41b080042000410c6a1003200028020c2200418180014f0d00200041044f044041b08004280200419bddf6f405460d020b100f000b000b1010100e000bda1102097f037e230041b0016b2200240002400240100b41ff01714105470d002000418080013602800141b0800420004180016a10032000280280012207418180014f0d0020074104490d01200741046b210441b08004280200220341187621062003411076210520034108762102027f02400240200341ff017122034106470440200341ef01460d012003411747200241ff017141e8014772200541ff0171412c47720d05200641b201460d020c050b200241ff017141bf0147200541ff017141b0014772200641ca0147200441204972720d04200041e8006a41bd8004290000370300200041f0006a41c58004290000370300200041f7006a41cc8004290000370000200041b5800429000037036041b480042d0000210641010c020b200241ff0171411347200541ff017141a0014772200641ce0147200441204972720d03200041e8006a41bd8004290000370300200041f0006a41c58004290000370300200041f7006a41cc8004290000370000200041b5800429000037036041b480042d0000210641020c010b200741046b4130490d022000418e016a41bc800429020037000020004196016a41c480042902003700002000419e016a41cc8004290200370000200041b4800429020037008601200041e8006a20004188016a290000370300200041f0006a20004190016a290000370300200041f7006a20004197016a290000370000200020002900800137036041dc8004290200210a41d4800429020021092000200041a2016a28000036005b2000200028009f0136025841000b2104200041d2006a200028005b360000200041c7006a200041f7006a290000370000200041406b200041f0006a290300370300200041386a200041e8006a290300370300200020002903603703302000200028025836004f20004280800137028401200041b0800436028001410020004180016a100920002802840122032000280288012205490d0020002802800121022000200320056b22033602800120022005200220056a20004180016a100021022003200028028001492002410c4f720d002002410274418080046a2802000d00024002400240200441016b0e020102000b200041a8016a200a37030020004198016a200041ce006a29010037030020004190016a200041c6006a29010037030020004188016a2000413e6a290100370300200020093703a0012000200029013637038001230041306b2202240020004180016a220041286a290300210a20002903202109200241186a200041186a290000370300200241106a200041106a290000370300200241086a200041086a29000037030020022000290000370300200242808001370224200241b0800436022041beceebf27c200241206a22001009200220001007024002402002280224220020022802282204490d0020022802202103200241003602282002200020046b3602242002200320046a3602202009200a200241206a100a2002280228220020022802244b0d00200320042002280220200010041a200241306a24000c010b000b1010100e000b20004189016a200041386a29030037000020004191016a200041406b29030037000020004198016a200041c7006a290000370000200020063a008001200020002903303700810141002106230041f0016b22012400200141b8016a22044200370300200141c0016a4200370300200141a8016a20004180016a220341186a290000370300200141a0016a200341106a29000037030020014198016a200341086a290000370300200142003703b0012001200329000037039001200141d8006a220320014190016a2202413810062002200341381006200142efa1f8ae0f3703c80120012903c00121092001428080013702d401200141b080043602d0012002200141d0016a10070240024020012802d401220320012802d8012202490d0020012802d0012105200141003602d8012001200320026b3602d4012001200220056a3602d00120012903b0012004290300200141d0016a100a20012802d401220320012802d8012204490d00200320046b220341034d0d00200420012802d00122046a220241efa1f8ae7f3600002001200341046b22033602d001410020052009200420024104200241046a2205200141d0016a10022102200320012802d0012204492002410b4b722004452002417d7172720d00200441016b2103200541016a210402400240024020052d000022050e020100030b2003450d024101210720042d00004101470d020c010b20034120490d01200141d8016a2004410f6a290000370300200141e0016a200441176a290000370300200141e8016a2004411f6a2d00003a0000200120042900073703d0012004280003210720042f0001210820042d000021060b200141206a2202200141d8016a290300370300200141286a2204200141e0016a290300370300200141306a2203200141e8016a2802003a0000200120012903d00137031820050d00200141f0006a20032d000022033a0000200141e8006a2004290300220b370300200141e0006a2002290300220a3703002001200129031822093703582001419f016a200a370000200141a7016a200b370000200141af016a20033a00002001200736009301200120083b009101200120063a0090012001200937009701200120014190016a100c200141106a290300210a200129030021092000200129030837030820002009370300200041106a200a370300200141f0016a24000c010b000b20002903002000290308200041106a290300100d000b20004189016a200041386a29030037000020004191016a200041406b29030037000020004198016a200041c7006a290000370000200020063a0080012000200029033037008101230041406a22042400200441386a20004180016a220341186a290000370300200441306a200341106a290000370300200441286a200341086a29000037030020042003290000370320200441086a200441206a100c200441186a290300210a20042903082109200041186a2203200429031037030820032009370300200341106a200a370300200441406b240020002903182000290320200041286a290300100d000b000b100f000b0b310100418480040b290100000002000000030000000400000005000000060000000700000008000000090000000c0000000b","build_info":{"build_mode":"Release","cargo_contract_version":"2.0.2","rust_toolchain":"nightly-aarch64-apple-darwin","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"price_oracle","version":"0.0.1","authors":["Starlay Finance"]},"spec":{"constructors":[{"args":[],"docs":[],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":1},"selector":"0x9bae9d5e"}],"docs":[],"events":[],"lang_error":{"displayName":["ink","LangError"],"type":3},"messages":[{"args":[{"label":"asset","type":{"displayName":["priceoracle_external","GetUnderlyingPriceInput1"],"type":4}}],"docs":[],"label":"PriceOracle::get_underlying_price","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":7},"selector":"0x06bfb0ca"},{"args":[{"label":"asset","type":{"displayName":["priceoracle_external","SetFixedPriceInput1"],"type":4}},{"label":"value","type":{"displayName":["priceoracle_external","SetFixedPriceInput2"],"type":0}}],"docs":[],"label":"PriceOracle::set_fixed_price","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x17e82cb2"},{"args":[{"label":"asset","type":{"displayName":["priceoracle_external","GetPriceInput1"],"type":4}}],"docs":[],"label":"PriceOracle::get_price","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":7},"selector":"0xef13a0ce"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"struct":{"fields":[{"layout":{"root":{"layout":{"leaf":{"key":"0xce5ae73e","ty":0}},"root_key":"0xce5ae73e"}},"name":"fixed_prices"}],"name":"Data"}},"name":"price_oracle"}],"name":"PriceOracleContract"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"primitive":"u128"}}},{"id":1,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":2},{"name":"E","type":3}],"path":["Result"]}},{"id":2,"type":{"def":{"tuple":[]}}},{"id":3,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":4,"type":{"def":{"composite":{"fields":[{"type":5,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":5,"type":{"def":{"array":{"len":32,"type":6}}}},{"id":6,"type":{"def":{"primitive":"u8"}}},{"id":7,"type":{"def":{"variant":{"variants":[{"fields":[{"type":8}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":8},{"name":"E","type":3}],"path":["Result"]}},{"id":8,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":0}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":0}],"path":["Option"]}},{"id":9,"type":{"def":{"variant":{"variants":[{"fields":[{"type":10}],"index":0,"name":"Ok"},{"fields":[{"type":3}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":10},{"name":"E","type":3}],"path":["Result"]}},{"id":10,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2}],"index":0,"name":"Ok"},{"fields":[{"type":11}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":2},{"name":"E","type":11}],"path":["Result"]}},{"id":11,"type":{"def":{"variant":{}},"path":["logics","traits","price_oracle","Error"]}}],"version":"4"}`;