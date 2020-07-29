class ListsController < ApplicationController
    def index
        lists = List.all
        render json: lists, include: :expenditures
    end

    def update
        list = List.find(params[:id])
        list.update(list_params)
    end

    def create
        user = User.find(params[:user])
        list = List.create(category: params[:category], user: user)
        render json: list
    end

    def destroy
        List.find(params[:id]).destroy
    end

    private

        def list_params
            params.require(:list).permit(:category)
        end
end
