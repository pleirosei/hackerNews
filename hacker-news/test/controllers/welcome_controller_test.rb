require 'test_helper'

class WelcomeControllerTest < ActionController::TestCase
  test "should get angular" do
    get :angular
    assert_response :success
  end

end
