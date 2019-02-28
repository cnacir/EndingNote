class ApplicationController < ActionController::Base
	before_action :authenticate_user!
	before_action :configure_permitted_parameters, if: :devise_controller?

	def after_sign_in_path_for(resource)
		game_path
	end

	protected
    def configure_permitted_parameters
       devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :highscore])
			 devise_parameter_sanitizer.permit(:sign_in, keys: [:username])
			 devise_parameter_sanitizer.permit(:account_update, keys: [:username, :highscore])
    end
end
