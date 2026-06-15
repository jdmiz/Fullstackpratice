
--income/unit script inside serverscript

local folder = workspace:WaitForChild("Game"):WaitForChild("Buttons")
local unitFolder = workspace.Game:WaitForChild("Units")

local ReplicatedStorage = game:GetService('ReplicatedStorage')
local MarketplaceService = game:GetService('MarketplaceService')

local Remotes = ReplicatedStorage.RE
local Modules = ReplicatedStorage.Modules

local GlobalsMod = require(Modules.Globals)
local SettingsMod = require(Modules.Settings)

local rewardTime = SettingsMod.PaymentTime


local UnitsSpawned = {} -- need to empty this when player leaves

local function spawnUnit(v, tabler, maxUnits,data)
	if unitFolder:FindFirstChild(v.Name) == nil then 
		warn(v.Name.."Doesn't exist")
		return 
	end
	local currentCount = unitFolder[v.Name]
	if #currentCount:GetChildren() < maxUnits then
		for i,building in ipairs(tabler) do
			wait(1)
			if building.Parent == nil then return end
			local lookfor = ''
			if building:FindFirstChild('SubCategory') then
				lookfor = building.SubCategory.Value
			else
				lookfor = building.Parent.Class.Value.Name
		end
		local stats = GlobalsMod.FindMod(lookfor,building.Name)
		if v == nil or stats == nil or #currentCount:GetChildren() >= maxUnits then if stats == nil then print('STATS IS NIL') end return end
			local Unit = ReplicatedStorage.Game.Units:FindFirstChild(stats.Unit)
			if Unit then
				local new = Unit:Clone()
				local prestige = data.Rebirth
					if prestige> 0 then
						local level = game.ReplicatedStorage.Elements.level:Clone()
						level.Parent = new.PrimaryPart
						level.namer.Text = prestige
						new.PrimaryPart.Damage.Value = new.PrimaryPart.Damage.Value + 2
					end
					if UnitsSpawned[v.Name] == nil then
						UnitsSpawned[v.Name] = 0
					end
				if UnitsSpawned[v.Name] == nil then
					UnitsSpawned[v.Name] = 0
				end
				UnitsSpawned[v.Name] = UnitsSpawned[v.Name] + 1
				if UnitsSpawned[v.Name] % 5 == 0 then
					local board = ReplicatedStorage.Elements.BillboardGui:Clone()
					board.namer.Text = string.upper(v.Name) .. ' ARMY'
					board.Parent = new.PrimaryPart
					local Nation = game.ReplicatedStorage.Elements.FlagIdentifier:Clone()
					Nation.Parent = new.PrimaryPart
					repeat wait(1) until game.ReplicatedStorage.RE.fetchFlag:Invoke(v)
					local ID = game.ReplicatedStorage.RE.fetchFlag:Invoke(v)
					Nation.ImageLabel.Image = ID
				end
				new.Humanoid.Died:Connect(function()
					--delay(3,function()
						if new.Parent ~= workspace.Game.Dead then
							new.Parent = workspace.Game.Dead
							-- clear everyones attacking.Value if it = new
							new.Parent = workspace.Game.Dead
							
							
							
							if new.PrimaryPart then
								
								local gui = new.PrimaryPart:FindFirstChild('BillboardGui')
								if gui then
									gui:Destroy()
								end
								local flaggui = new.PrimaryPart:FindFirstChild('FlagIdentifier')
								if flaggui then
									flaggui:Destroy()
								end
								
								for i,v in pairs (new:GetChildren()) do
									if v:IsA('BasePart') then
										v.Material = Enum.Material.CorrodedMetal
										if v:IsA('MeshPart') then
											v.TextureID = ''
										end
									elseif v:FindFirstChild('Mesh') then
										v.Mesh.TextureId = ''
									end
								end
								local class = ''
								if new.PrimaryPart:FindFirstChild('Class') then
									class = new.PrimaryPart.Class.Value
								end
								if new.PrimaryPart:FindFirstChild('Attacking') then
									new.PrimaryPart.Attacking.Value = nil
								end
								if new.PrimaryPart:FindFirstChild('Beam') then
									new.PrimaryPart.Beam:Destroy()
								end
								
								if new.PrimaryPart then
									if not new.PrimaryPart:IsA('MeshPart') then
									new:SetPrimaryPartCFrame(new.PrimaryPart.CFrame * CFrame.Angles(math.rad(-90),0,0))
									end
								end
									--print('Yup')
								
							end
							new.Humanoid:Destroy()
							delay(2,function()
								if new.PrimaryPart then
									new.PrimaryPart.Anchored = true
								end
							end)
							
							game.Debris:AddItem(new,30)
						end
					--end)
				end)
				local nae
				new.Parent = unitFolder:WaitForChild(v.Name)
				if new.PrimaryPart == nil then
					print('THIS IS GOING TO ERROR BECAUSE ',new,'DOES NOT HAVE A PRIAMRYPART')
				end
				local buildingCFrame = nil
				if building.PrimaryPart then
					buildingCFrame = building.PrimaryPart.CFrame
				else
					if building.Parent then
						buildingCFrame = building.Parent.CFrame
					else
						print('Has an issue')
					end
				end
				--new:SetPrimaryPartCFrame(building.PrimaryPart.CFrame * CFrame.new(math.random(-building.PrimaryPart.Size.X/2, building.PrimaryPart.Size.X/2),3,-building.PrimaryPart.Size.Z))
				if new.PrimaryPart then
					if buildingCFrame then
						new:SetPrimaryPartCFrame(buildingCFrame + Vector3.new((building.PrimaryPart.Size.X/2) +3,math.random(3),math.random(-10,10)))
					else
						if building.Parent then
							new:SetPrimaryPartCFrame(CFrame.new(building.Parent.Position))
							print(new)
							print('Does NOT have a primaryPart')
						else
							--print(v.Name,' parent is nil')
						end
					end
				else
					print('THIS WOULD HAVE ERRORED BECAUSE ',new,'DOES NOT HAVE A PRIAMRYPART')
				end
				if building.Parent then
					local teamColor = building.Parent.BrickColor
					for i,v in ipairs(new:GetDescendants()) do
						if v.Name == "COLOR" then
							v.BrickColor = teamColor
						end
					end
				end
			end	
		end
	end
end

local function getMaxUnits(player)
	local maxUnits = 0 
	for i,c in ipairs(folder[player.Name]:GetChildren()) do
		if c:FindFirstChildOfClass("Model") then
			local building = c:FindFirstChildOfClass("Model")
			local lookfor = ''
			if building:FindFirstChild('SubCategory') then
				lookfor = building.SubCategory.Value
			else
				lookfor = c.Class.Value.Name
			end
			local stats = GlobalsMod.FindMod(lookfor,building.Name)
			if stats.Pop then
				maxUnits = maxUnits + stats.Pop
			end
		end
	end
	local owned = Remotes.GetPurchasedPasses:Invoke(player,SettingsMod.Gamepasses.DoubleUnits)
	if owned then
		maxUnits = maxUnits * 2
	end
	return maxUnits
end

ReplicatedStorage.RE.GetMaxUnits.OnInvoke = function(Player)
	return getMaxUnits(Player)
end


while true do
	
	for i=1, rewardTime do
		wait(1)
		local maths = rewardTime - i 
		game.ReplicatedStorage.RE.timer:FireAllClients(maths)
	end
	spawn(function()
		for i,v in ipairs(game.Players:GetPlayers()) do
			if folder:FindFirstChild(v.Name) and unitFolder:FindFirstChild(v.Name) then
				local totalMoney = 0 
				local maxUnits = 0 
				local military = {}
				for j,k in ipairs(folder[v.Name]:GetChildren()) do
					if k:FindFirstChildOfClass("Model") then
						local building = k:FindFirstChildOfClass("Model")
						local lookfor = ''
						if building:FindFirstChild('SubCategory') then
							lookfor = building.SubCategory.Value
						else
							lookfor = k.Class.Value.Name
						end
						local stats = GlobalsMod.FindMod(lookfor,building.Name)
						if stats.Pop then
							maxUnits = maxUnits + stats.Pop
						else
								
						end
						if stats.Income then
							totalMoney = totalMoney + stats.Income
						end
						if stats.Unit then
							local un = ReplicatedStorage.Game.Units:FindFirstChild(stats.Unit)
							if un then
								table.insert(military,building)
							end
						end
					end
				end
				if totalMoney > 0 then
					local owned = Remotes.GetPurchasedPasses:Invoke(v,SettingsMod.Gamepasses.DoubleGold)
					if owned then
						totalMoney = totalMoney * 2
					end
					game.ReplicatedStorage.RE.giveMoney:Fire(v, totalMoney)
				end
				local owned = Remotes.GetPurchasedPasses:Invoke(v,SettingsMod.Gamepasses.DoubleUnits)
				if owned then
					maxUnits = maxUnits * 2
				end	
				if #military > 0 then
					spawn(function()
						local data = game.ReplicatedStorage.RE.getMainData2:Invoke(v)
						spawnUnit(v, military,maxUnits,data)
					end)
				end
				Remotes.UpdateMaxUnits:FireClient(v,maxUnits)	
			end
		end
	end)
end