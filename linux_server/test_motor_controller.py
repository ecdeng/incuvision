import unittest
import motor_controller

class TestMotorController(unittest.TestCase):

    def setUp(self):
        self.controller = motor_controller.MotorController(None, None)

    def test_valid_cmd_xf(self):
        self.assertTrue(self.controller.valid_cmd('xf1000'))
    
    def test_valid_cmd_yf(self):
        self.assertTrue(self.controller.valid_cmd('yf1000'))
    
    def test_invalid_cmd_wrong_dir(self):
        self.assertFalse(self.controller.valid_cmd('pf1000'))
    
    def test_invalid_cmd_nodir(self):
        self.assertFalse(self.controller.valid_cmd('1000'))

    def test_invalid_cmd_negitive(self):
        self.assertFalse(self.controller.valid_cmd('xf-1000'))

    def test_invalid_cmd_too_big(self):
        self.assertFalse(self.controller.valid_cmd('yf10000000000'))

    def test_ivnalid_cmd_empty(self):
        self.assertFalse(self.controller.valid_cmd(''))

if __name__ == '__main__':
    unittest.main()