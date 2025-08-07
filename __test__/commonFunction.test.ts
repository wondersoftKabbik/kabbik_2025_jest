import {normalizeBLNumber,StringToJSX} from '@/helpers/commonFunction'



describe('normalizeBLNumber', () => {
  test('returns a fixed format 19...', () => {
    expect(normalizeBLNumber('01911223344')).toBe('1911223344');
    expect(normalizeBLNumber('1911223344')).toBe('1911223344');
    expect(normalizeBLNumber('8801911223344')).toBe('1911223344');
    expect(normalizeBLNumber('+8801911223344')).toBe('1911223344');
    expect(normalizeBLNumber('1311223344')).toBe(null);
  });
});


describe('StringToJSX', () => {
  test('\n should be <br/>', () => {
    expect(StringToJSX('\n')).toBe('<br/>');
    expect(StringToJSX('1911223344\n')).toBe('1911223344<br/>');
    expect(StringToJSX('       \n')).toBe('       <br/>');
  });
});