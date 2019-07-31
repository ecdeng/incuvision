import com_handler
import unittest

class TestComHandler(unittest.TestCase):
    def setUp(self):
        self.handler = com_handler.ComHandler(False, False)

    def test_str_to_tuple_positive(self):
        tup = self.handler.str_to_tuple('(100, 100)')
        self.assertEqual(tup, (100, 100))

    def test_str_to_tuple_negitive(self):
        tup = self.handler.str_to_tuple('(-100, -100)')
        self.assertEqual(tup, (-100, -100))

    def test_str_to_tuple_nominal(self):
        tup = self.handler.str_to_tuple('(-1, 500)')
        self.assertEqual(tup, (-1, 500))

    def test_str_to_tuple_too_big(self):
        tup = self.handler.str_to_tuple('(100000000000000, 1)')
        self.assertEqual(tup, (100000000000000, 1))

    def test_str_to_tuple_two_three(self):
        tup = self.handler.str_to_tuple('(2,3)')
        self.assertEqual(tup, (2, 3))

    def test_str_to_tuple_whitespace(self):
        tup = self.handler.str_to_tuple(' (2, 3)')
        self.assertEqual(tup, (2, 3))

    def test_point_is_valid(self):
        self.assertTrue(self.handler.point_is_valid('(100, 100)'))

    def test_point_is_valid_negative(self):
        self.assertTrue(self.handler.point_is_valid('(-100, -100)'))

    def test_point_is_valid_23(self):
        self.assertTrue(self.handler.point_is_valid('(2,3)'))

    def test_point_is_valid_whitespace(self):
        self.assertTrue(self.handler.point_is_valid(' (2, 3)'))

    def test_point_is_invalid_too_big(self):
        self.assertFalse(self.handler.point_is_valid('(100000000000, 1)'))

    def test_point_is_invalid_not_int(self):
        self.assertFalse(self.handler.point_is_valid('(10.0, -10.0)'))

    def test_point_is_invalid_empty(self):
        self.assertFalse(self.handler.point_is_valid(''))

    def test_point_is_invalid_wrong_format(self):
        self.assertFalse(self.handler.point_is_valid('100, 100'))

    def test_point_is_invalid_random_str(self):
        self.assertFalse(self.handler.point_is_valid('fjkdalshfkdls'))
    
    def test_point_is_invalid_random_str_with_paren(self):
        self.assertFalse(self.handler.point_is_valid('(dsfsfs)'))

    def test_convert_move_nominal(self):
        move = self.handler.convert_move_cmd((100, 100))
        self.assertEqual(move, ('xf100', 'yf100'))

    def test_convert_move_ccw(self):
        move = self.handler.convert_move_cmd((-100, -100))
        self.assertEqual(move, ('xb100', 'yb100'))

    def test_convert_move_cw_ccw(self):
        move = self.handler.convert_move_cmd((10, -20))
        self.assertEqual(move, ('xf10', 'yb20'))

if __name__ == '__main__':
    unittest.main()