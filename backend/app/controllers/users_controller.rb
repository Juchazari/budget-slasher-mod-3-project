class UsersController < ApplicationController
    def index
        users = User.all
        render json: users, include: {lists: {include: :expenditures}}
    end
end
